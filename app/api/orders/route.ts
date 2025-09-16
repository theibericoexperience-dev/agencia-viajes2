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
  ensureDataDir();
  const body = await req.json();
  // Try Supabase first when configured
  const sb = getSupabase();
  if (sb) {
    try {
      const insert = { ...body };
      // prefer named columns if payload contains nested payload
      if (body.payload && typeof body.payload === 'object') {
        Object.assign(insert, body.payload);
        delete insert.payload;
      }
      const res = await sb.from('orders').insert(insert).select();
      if (res.error) {
        // If table missing or insert failed, fallback to file
        console.error('Supabase insert error', res.error.message || res.error);
      } else {
        return NextResponse.json({ ok: true, supabase: true, data: res.data });
      }
    } catch (err: any) {
      console.error('Supabase exception', err?.message || err);
    }
  }

  // Fallback: persist to local file
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    arr.push(body);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(arr, null, 2));
    return NextResponse.json({ ok: true, supabase: !!sb ? false : null });
  } catch (err) {
    // Temporary debug: include stack trace in production response so we can see Vercel error
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    const body = { ok: false, error: message } as any;
    if (process.env.NODE_ENV === 'production') body.debug_stack = stack;
    return NextResponse.json(body, { status: 500 });
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
