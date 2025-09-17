// This file provides a canonical client config object for Sentry.
// Actual initialization should happen once in `instrumentation-client.js`.
module.exports = {
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || '',
  tracesSampleRate: 0.05,
};
