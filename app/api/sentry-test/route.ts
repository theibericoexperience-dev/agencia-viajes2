import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  try {
    throw new Error('Sentry test error from server route');
  } catch (err: any) {
    // Initialize Sentry if configured and capture the exception.
    try { initSentry(); } catch (e) { /* ignore init errors */ }
    const sentryId = captureException(err) || null;
    // Return the Sentry event id (when available) to make verification easier.
    return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: sentryId }, { status: 500 });
  }
}
