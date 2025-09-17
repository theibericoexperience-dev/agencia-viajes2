import { NextResponse } from 'next/server';
import { initSentry, captureException } from '../../../lib/sentry';

export async function GET() {
  // Intentionally throw an error to validate Sentry server-side reporting
  try {
    throw new Error('Sentry test error from server route');
  } catch (err: any) {
    // Diagnostic logs to help debug runtime env + SDK behavior on Vercel
    try {
      const masked = process.env.SENTRY_DSN ? `${String(process.env.SENTRY_DSN).slice(0,8)}...` : null;
      // eslint-disable-next-line no-console
      console.log('[DIAG] SENTRY_DSN present:', !!process.env.SENTRY_DSN, 'masked:', masked);
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const NodeSentry = require('@sentry/node');
        const clientExists = !!NodeSentry.getCurrentHub().getClient();
        // eslint-disable-next-line no-console
        console.log('[DIAG] @sentry/node clientExists before init:', clientExists);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('[DIAG] @sentry/node check failed:', String(e));
      }
    } catch (diagErr) {
      // eslint-disable-next-line no-console
      console.log('[DIAG] error while writing diag info', String(diagErr));
    }

    // Initialize Sentry if configured and capture the exception.
    try { initSentry(); } catch (e) { /* ignore init errors */ }
    const sentryId = captureException(err) || null;

    // Log capture result for runtime visibility
    // eslint-disable-next-line no-console
    console.log('[DIAG] captureException returned:', sentryId);

    // Return the Sentry event id (when available) to make verification easier.
    return NextResponse.json({ ok: false, error: err?.message || String(err), error_id: sentryId }, { status: 500 });
  }
}
