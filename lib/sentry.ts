// Minimal no-op Sentry wrapper.
// Purpose: avoid runtime Sentry initialization errors on deployed serverless
// functions while keeping the same interface used throughout the app.
// Lightweight Sentry wrapper with safe, lazy initialization.
// - Uses `require` to avoid build-time side-effects.
// - Initializes server-side with `@sentry/node` and client-side with `@sentry/nextjs` when available.
// - Keeps functions idempotent and safe if env vars are missing.

let _initialized = false;

export function initSentry(): void {
  if (_initialized) return;

  try {
    if (typeof window === 'undefined') {
      // Server-side init
      try {
        // Use require so bundlers don't force these packages at build-time
        // unless they're present in node_modules.
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Sentry = require('@sentry/node');

        Sentry.init({
          dsn: process.env.SENTRY_DSN || undefined,
          environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
          release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
          tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0,
        });

        _initialized = true;
        return;
      } catch (e) {
        // If server Sentry init fails, log and continue — don't throw.
        // eslint-disable-next-line no-console
        console.error('Sentry server init failed', String((e as any)?.message ?? e));
      }
    } else {
      // Client-side init (browser)
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const SentryNext = require('@sentry/nextjs');

        SentryNext.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || undefined,
          environment: process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV || process.env.NODE_ENV,
          release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.SENTRY_RELEASE || undefined,
          tracesSampleRate: Number(process.env.NEXT_PUBLIC_SENTRY_TRACES_SAMPLE_RATE) || 0,
        });

        _initialized = true;
        return;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('Sentry client init failed', String((e as any)?.message ?? e));
      }
    }
  } catch (err) {
    // Unexpected errors should not break the app.
    // eslint-disable-next-line no-console
    console.error('Sentry init unexpected error', String((err as any)?.message ?? err));
  }
}

export function captureException(e: any): string | null {
  try {
    initSentry();
    if (typeof window === 'undefined') {
      // Server
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Sentry = require('@sentry/node');
      if (Sentry && typeof Sentry.captureException === 'function') {
        const id = Sentry.captureException(e);
        return id || null;
      }
    } else {
      // Client
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const SentryNext = require('@sentry/nextjs');
      if (SentryNext && typeof SentryNext.captureException === 'function') {
        const id = SentryNext.captureException(e);
        return id || null;
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('captureException failed', String((err as any)?.message ?? err));
  }

  return null;
}
