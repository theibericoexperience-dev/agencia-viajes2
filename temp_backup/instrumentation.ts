export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }
  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

// Lazy accessor for Sentry helpers to avoid importing the SDK at module
// load time (which can trigger auto-initialization in some bundlers).
export async function onRequestError(...args: any[]) {
  try {
    const Sentry = await import('@sentry/nextjs');
    if (Sentry && typeof Sentry.captureRequestError === 'function') {
      const fn = Sentry.captureRequestError as unknown as (...a: any[]) => any;
      return fn(...args);
    }
  } catch (err) {
    // noop on import failure
  }
}
