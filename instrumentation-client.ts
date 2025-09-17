// This file configures the initialization helpers for Sentry on the client.
// It intentionally DOES NOT call `Sentry.init()` to avoid duplicate client inits.
// A single canonical client initializer should be used (for example `sentry.client.config.js`).
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Export helper that other parts of the app can use without causing a second init.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;