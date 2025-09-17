// Client Sentry configuration for Next.js.
// This file is the single canonical place to call `Sentry.init()` on the client.
// It deliberately reads configuration from environment variables so sensitive
// values are not committed to source control.
// - `NEXT_PUBLIC_SENTRY_DSN` (recommended for browser DSN)
// - `SENTRY_TRACES_SAMPLE_RATE` (optional, float between 0 and 1)
// - `SENTRY_RELEASE` (optional)
// - `SENTRY_ENVIRONMENT` (optional)
// See: https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || undefined,
  environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
  tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0,
  // Keep debug off by default; enable with `SENTRY_DEBUG=1` in development only.
  debug: Boolean(process.env.SENTRY_DEBUG && process.env.SENTRY_DEBUG !== '0'),
});

export default Sentry;
// This file provides a canonical client config object for Sentry.
// Actual initialization should happen once in `instrumentation-client.js`.
module.exports = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || '',
  tracesSampleRate: 0.05,
};
