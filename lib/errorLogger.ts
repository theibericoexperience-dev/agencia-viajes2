import fs from 'fs';
import path from 'path';

function repoRoot() {
  return process.cwd();
}

const DATA_DIR = path.join(repoRoot(), 'data');
const ERRORS_FILE = path.join(DATA_DIR, 'errors.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(ERRORS_FILE)) fs.writeFileSync(ERRORS_FILE, JSON.stringify([]));
}

async function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = require('@supabase/supabase-js');
  return createClient(url, key);
}

export async function logErrorToSupabase(entry: {
  error_id: string;
  route?: string;
  level?: string;
  message?: string;
  stack?: string;
  payload_preview?: any;
}) {
  // Try Supabase insert first
  try {
    const sb = await getSupabaseClient();
    if (sb) {
      const insert = {
        error_id: entry.error_id,
        route: entry.route || null,
        level: entry.level || 'error',
        message: entry.message || null,
        stack: entry.stack || null,
        payload_preview: entry.payload_preview ? JSON.stringify(entry.payload_preview).slice(0, 2000) : null,
        created_at: new Date().toISOString(),
      } as any;
      try {
        const res = await sb.from('errors').insert(insert).select();
        if (!res.error && res.data && res.data[0] && res.data[0].id) {
          return String(res.data[0].id);
        }
      } catch (e: any) {
        console.error('Supabase insert errors table failed', String(e?.message || e));
      }
    }
  } catch (e: any) {
    console.error('errorLogger.getSupabaseClient failed', String(e?.message || e));
  }

  // Fallback to local file
  try {
    ensureDataDir();
    const raw = fs.readFileSync(ERRORS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    const id = (arr.length ? arr[arr.length - 1].id + 1 : 1);
    const record = Object.assign({ id, created_at: new Date().toISOString() }, entry);
    arr.push(record);
    fs.writeFileSync(ERRORS_FILE, JSON.stringify(arr, null, 2));
    return String(id);
  } catch (e: any) {
    console.error('errorLogger fallback write failed', String(e?.message || e));
    return null;
  }
}
