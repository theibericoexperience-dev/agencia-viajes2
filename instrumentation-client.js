// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

// Initialize Sentry on the client only if it hasn't already been initialized
// (e.g., by an automatic config loader). This prevents the runtime warning
// about calling `Sentry.init()` more than once.
// Client initialization is provided by the Next.js Sentry integration when using
// a `sentry.client.config.js` file. Do not call `Sentry.init()` here to avoid
// duplicate initializations — this file only exposes helper hooks.

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
