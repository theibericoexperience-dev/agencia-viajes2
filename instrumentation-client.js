// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

// Avoid importing `@sentry/nextjs` at module load time to prevent any
// accidental side-effects or auto-initialization in environments where a
// `sentry.client.config.js` file is present. Use a dynamic import when the
// helper is needed so we only access the SDK at runtime and after initialization
// decisions have been made.

export async function onRouterTransitionStart(...args) {
	try {
		const Sentry = await import('@sentry/nextjs');
		if (Sentry && typeof Sentry.captureRouterTransitionStart === 'function') {
			return Sentry.captureRouterTransitionStart(...args);
		}
	} catch (err) {
		// If the SDK isn't available or import fails, just noop.
	}
}
