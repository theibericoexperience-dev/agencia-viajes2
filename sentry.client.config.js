// Client Sentry configuration for Next.js.
// This file is the single canonical place to call `Sentry.init()` on the client.
// It deliberately reads configuration from environment variables so sensitive
// values are not committed to source control.
// - `NEXT_PUBLIC_SENTRY_DSN` (recommended for browser DSN)
// - `SENTRY_TRACES_SAMPLE_RATE` (optional, float between 0 and 1)
// - `SENTRY_RELEASE` (optional)
// - `SENTRY_ENVIRONMENT` (optional)
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

/* eslint-disable @typescript-eslint/no-var-requires */
try {
  const Sentry = require('@sentry/nextjs');

  const shouldInit = (() => {
    try {
      const hub = Sentry.getCurrentHub && Sentry.getCurrentHub();
      const client = hub && hub.getClient && hub.getClient();
      return !client;
    } catch (e) {
      return true;
    }
  })();

  if (typeof window !== 'undefined' && shouldInit) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || undefined,
      environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
      release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
      tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0,
      debug: Boolean(process.env.SENTRY_DEBUG && process.env.SENTRY_DEBUG !== '0'),
    });
  }

  module.exports = Sentry;
} catch (err) {
  // If the SDK isn't available at runtime, fail silently — this keeps the
  // application from crashing in environments where Sentry isn't installed.
  // eslint-disable-next-line no-console
  console.error('sentry.client.config.js load error:', String(err && err.message ? err.message : err));
  module.exports = {};
}

