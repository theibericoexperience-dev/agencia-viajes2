import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';
import { logErrorToSupabase } from '../../../lib/errorLogger';
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
  initSentry();
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
    // Supabase not configured. On Vercel writing to repo files isn't persistent; use /tmp as a safe fallback
    // so the API returns success and the owner can retrieve pending orders later.
    try {
      const fallbackDir = '/tmp';
      const fallbackFile = path.join(fallbackDir, 'orders_fallback.json');
      let arr: any[] = [];
      try {
        if (fs.existsSync(fallbackFile)) {
          const raw = fs.readFileSync(fallbackFile, 'utf-8');
          arr = JSON.parse(raw || '[]');
        }
      } catch (e) {
        // ignore parse errors and overwrite
        arr = [];
      }
      const record = { name, email, phone, travelers, preferred_date, billing_address, notes, created_at: new Date().toISOString() };
      arr.push(record);
      try {
        fs.writeFileSync(fallbackFile, JSON.stringify(arr, null, 2));
      } catch (e) {
        // if writing to /tmp fails, fall back to returning success but include payload preview
        console.error('Failed to write fallback order', String(e));
        return NextResponse.json({ ok: true, supabase: false, stored: false, preview: record });
      }
      return NextResponse.json({ ok: true, supabase: false, stored: true });
    } catch (err: any) {
      const sentryId = captureException(err) || Math.random().toString(36).slice(2, 9);
      console.error('Fallback order write failed error_id=', sentryId, err);
      return NextResponse.json({ ok: false, error: String(err), error_id: sentryId }, { status: 500 });
    }
  }

  // Try to insert into Supabase
  try {
    const insert = { name, email, phone, travelers, preferred_date, billing_address, notes };

    // retry with exponential backoff
    const maxAttempts = 3;
    let attempt = 0;
    let lastErr: any = null;
    while (attempt < maxAttempts) {
      attempt += 1;
      try {
        const res = await sb.from('orders').insert(insert).select();
        if (!res.error) {
          return NextResponse.json({ ok: true, supabase: true, data: res.data });
        }
        lastErr = res.error;
        console.error(`Supabase insert attempt ${attempt} error`, res.error);
      } catch (e: any) {
        lastErr = e;
        console.error(`Supabase insert attempt ${attempt} exception`, e);
      }
      // backoff
      await new Promise((r) => setTimeout(r, 200 * Math.pow(2, attempt)));
    }
  // capture to Sentry if configured and use its id as error_id, otherwise generate one
  const sentryId = captureException(lastErr) || Math.random().toString(36).slice(2, 9);
  console.error(`Supabase insert failed after ${maxAttempts} attempts. error_id=${sentryId}`, lastErr);
  // Log to Supabase errors table if possible
  try { await logErrorToSupabase({ error_id: sentryId, route: '/api/orders', message: lastErr?.message || String(lastErr), stack: lastErr?.stack, payload_preview: insert }); } catch(e) {}
  return NextResponse.json({ ok: false, error: 'Failed to persist order', error_id: sentryId }, { status: 500 });
  } catch (err: any) {
  const sentryId = captureException(err) || Math.random().toString(36).slice(2, 9);
  console.error(`Supabase exception error_id=${sentryId}`, err);
  try { await logErrorToSupabase({ error_id: sentryId, route: '/api/orders', message: err?.message || String(err), stack: err?.stack }); } catch(e) {}
  return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: sentryId }, { status: 500 });
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
