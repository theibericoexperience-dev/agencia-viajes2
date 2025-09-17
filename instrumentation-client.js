// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Initialize Sentry on the client only if it hasn't already been initialized
// (e.g., by an automatic config loader). This prevents the runtime warning
// about calling `Sentry.init()` more than once.
try {
  const currentHub = typeof Sentry.getCurrentHub === 'function' ? Sentry.getCurrentHub() : null;
  const existingClient = currentHub && typeof currentHub.getClient === 'function' ? currentHub.getClient() : null;
  if (!existingClient) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || '',
      integrations: [Sentry.replayIntegration()],
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1,
      enableLogs: true,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
      debug: false,
    });
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.warn('instrumentation-client: Sentry init check failed', String((e && e.message) || e));
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
