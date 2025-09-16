import * as NodeSentry from '@sentry/node';

export function initSentry() {
  if (!process.env.SENTRY_DSN) return;
  const dsn = process.env.SENTRY_DSN;
  const env = process.env.NODE_ENV || 'production';

  if (typeof window === 'undefined') {
    if (!NodeSentry.getCurrentHub().getClient()) {
      NodeSentry.init({ dsn, environment: env });
    }
  } else {
    // client-side initialization using @sentry/nextjs if available
    try {
      // dynamic import to avoid SSR bundling issues
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const NextSentry = require('@sentry/nextjs');
      if (!NextSentry.getCurrentHub().getClient()) {
        NextSentry.init({ dsn, environment: env });
      }
    } catch (err) {
      // ignore if nextjs package isn't available
    }
  }
}

export function captureException(e: any) {
  if (!process.env.SENTRY_DSN) return null;
  try {
    if (typeof window === 'undefined') return NodeSentry.captureException(e);
    // client
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const NextSentry = require('@sentry/nextjs');
    return NextSentry.captureException(e);
  } catch (err) {
    try { return NodeSentry.captureException(e); } catch (e2) { console.error('Sentry capture failed', e2); }
  }
  return null;
}
