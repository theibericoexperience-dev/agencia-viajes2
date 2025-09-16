import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Determine project root reliably. When running the standalone server the CWD
// is `.next/standalone/repo`. In that case the repo root is one level up.
function repoRoot() {
  const cwd = process.cwd();
  // If running inside .next/standalone/repo, the repo root is two levels up
  if (cwd.includes(path.join('.next', 'standalone', 'repo')) || cwd.endsWith(path.join('.next', 'standalone', 'repo'))) {
    return path.resolve(cwd, '..', '..');
  }
  // otherwise assume current working dir is repo root
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
  try {
    const body = await req.json();
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    arr.push(body);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(arr, null, 2));
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const arr = JSON.parse(raw || '[]');
    return NextResponse.json(arr);
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
