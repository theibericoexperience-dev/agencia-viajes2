const Sentry = require('@sentry/nextjs');

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  environment: process.env.NODE_ENV || 'development',
  tracesSampleRate: 0.1,
});

module.exports = Sentry;
// This file configures the initialization of Sentry on the server.
// The config uses environment variables so values are not committed to source.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
