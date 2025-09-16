import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN || '',
  tracesSampleRate: 0.02,
});

export default Sentry;
// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config uses environment variables so values are not committed to source.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
