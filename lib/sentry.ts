import * as Sentry from '@sentry/node';

export function initSentry() {
  if (process.env.SENTRY_DSN && !Sentry.getCurrentHub().getClient()) {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV || 'production',
    });
  }
}

export function captureException(e: any) {
  if (process.env.SENTRY_DSN) {
    try {
      const eventId = Sentry.captureException(e);
      return eventId;
    } catch (err) {
      console.error('Sentry capture failed', err);
    }
  }
  return null;
}
