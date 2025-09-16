import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Lazy-load supabase client only when env vars are present
let supabase: any = null;
function getSupabase() {
  if (supabase) return supabase;
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  // dynamic import to avoid adding dependency cost when not used
  const { createClient } = require('@supabase/supabase-js');
  supabase = createClient(url, serviceKey);
  return supabase;
}

function repoRoot() {
  const cwd = process.cwd();
  if (cwd.includes(path.join('.next', 'standalone', 'repo')) || cwd.endsWith(path.join('.next', 'standalone', 'repo'))) {
    return path.resolve(cwd, '..', '..');
  }
  return cwd;
}

const DATA_DIR = path.join(repoRoot(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ORDERS_FILE)) fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

export async function POST(req: Request) {
  const body = await req.json();

  // Basic validation
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const travelers = body.travelers ? parseInt(String(body.travelers), 10) : null;
  const preferred_date = body.preferred_date ? String(body.preferred_date) : null;
  const billing_address = typeof body.billing_address === 'string' ? body.billing_address : null;
  const notes = typeof body.notes === 'string' ? body.notes : null;

  if (!name || !email || !travelers || Number.isNaN(travelers)) {
    return NextResponse.json({ ok: false, error: 'Missing or invalid required fields (name, email, travelers)' }, { status: 400 });
  }

  const sb = getSupabase();
  if (!sb) {
    // In production we require Supabase; in dev we may fallback to file, but avoid writing to disk in serverless.
    if (process.env.VERCEL || process.env.NODE_ENV === 'production') {
      return NextResponse.json({ ok: false, error: 'Database not configured' }, { status: 503 });
    }
    // local/dev fallback: persist to file
    try {
      ensureDataDir();
      const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
      const arr = JSON.parse(raw || '[]');
      arr.push({ name, email, phone, travelers, preferred_date, billing_address, notes, created_at: new Date().toISOString() });
      fs.writeFileSync(ORDERS_FILE, JSON.stringify(arr, null, 2));
      return NextResponse.json({ ok: true, supabase: false });
    } catch (err: any) {
      return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
    }
  }

  // Try to insert into Supabase
  try {
    const insert = { name, email, phone, travelers, preferred_date, billing_address, notes };
    const res = await sb.from('orders').insert(insert).select();
    if (res.error) {
      console.error('Supabase insert error', res.error);
      return NextResponse.json({ ok: false, error: res.error.message || String(res.error) }, { status: 500 });
    }
    return NextResponse.json({ ok: true, supabase: true, data: res.data });
  } catch (err: any) {
    console.error('Supabase exception', err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}

export async function GET() {
  ensureDataDir();
  const sb = getSupabase();
  if (sb) {
    try {
      const res = await sb.from('orders').select('*');
      if (!res.error) return NextResponse.json(res.data);
      console.error('Supabase GET error', res.error);
    } catch (err: any) {
      console.error('Supabase GET exception', err?.message || err);
    }
  }

  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    return NextResponse.json(arr);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
