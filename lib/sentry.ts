import * as NodeSentry from '@sentry/node';

export function initSentry() {
  if (!process.env.SENTRY_DSN) return;
  const dsn = process.env.SENTRY_DSN;
  const env = process.env.NODE_ENV || 'production';

  if (typeof window === 'undefined') {
    // Always attempt to initialize server SDK when DSN is present.
    try {
      if (!NodeSentry.getCurrentHub().getClient()) {
        NodeSentry.init({ dsn, environment: env });
      }
    } catch (e) {
      // swallow - initialization may fail in non-Node runtimes
      // eslint-disable-next-line no-console
      console.error('[sentry] server init failed', String(e));
    }
  } else {
    // client-side initialization using @sentry/nextjs if available
    try {
      // dynamic require to avoid SSR bundling issues
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const NextSentry = require('@sentry/nextjs');
      if (!NextSentry.getCurrentHub().getClient()) {
        NextSentry.init({ dsn, environment: env });
      }
    } catch (err) {
      // ignore if nextjs package isn't available or cannot be required
    }
  }
}

export function captureException(e: any) {
  if (!process.env.SENTRY_DSN) return null;
  try {
    if (typeof window === 'undefined') {
      // Server: capture and return lastEventId for reliable verification
      try {
  NodeSentry.captureException(e);
  // Prefer `getLastEventId` if available, otherwise try `lastEventId` (older SDKs)
  const hub: any = NodeSentry.getCurrentHub();
  return (hub.getLastEventId ? hub.getLastEventId() : hub.lastEventId ? hub.lastEventId() : null) || null;
      } catch (inner) {
  try { const hub: any = NodeSentry.getCurrentHub(); return (hub.getLastEventId ? hub.getLastEventId() : hub.lastEventId ? hub.lastEventId() : null) || null; } catch (e2) { return null; }
      }
    }

    // Client: use @sentry/nextjs if available, then return lastEventId
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const NextSentry = require('@sentry/nextjs');
  NextSentry.captureException(e);
  const chub: any = NextSentry.getCurrentHub();
  return (chub.getLastEventId ? chub.getLastEventId() : chub.lastEventId ? chub.lastEventId() : null) || null;
    } catch (err) {
      // fallback to NodeSentry capture if available in this environment
      try {
  NodeSentry.captureException(e);
  const hub2: any = NodeSentry.getCurrentHub();
  return (hub2.getLastEventId ? hub2.getLastEventId() : hub2.lastEventId ? hub2.lastEventId() : null) || null;
      } catch (e2) {
        // eslint-disable-next-line no-console
        console.error('Sentry capture failed', String(e2));
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Sentry capture unexpected error', String(err));
  }
  return null;
}
