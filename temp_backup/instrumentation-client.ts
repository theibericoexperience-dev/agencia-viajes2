// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

export async function initSentryClient() {
	try {
		const Sentry: any = await import('@sentry/nextjs');
		const shouldInit = (() => {
			try {
				const hub = Sentry.getCurrentHub && Sentry.getCurrentHub();
				const client = hub && hub.getClient && hub.getClient();
				return !client;
			} catch (e) {
				return true;
			}
		})();
		if (typeof window !== 'undefined' && shouldInit) {
			Sentry.init({
				dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || process.env.SENTRY_DSN || undefined,
				environment: process.env.SENTRY_ENVIRONMENT || process.env.NODE_ENV,
				release: process.env.SENTRY_RELEASE || process.env.VERCEL_GIT_COMMIT_SHA || undefined,
				tracesSampleRate: Number(process.env.SENTRY_TRACES_SAMPLE_RATE) || 0,
				debug: Boolean(process.env.SENTRY_DEBUG && process.env.SENTRY_DEBUG !== '0'),
			});
		}
		return Sentry;
	} catch (err: any) {
		console.error('initSentryClient load error:', String(err?.message ?? err));
		return null;
	}
}

// Export helper that other parts of the app can use without causing a second init.
export async function onRouterTransitionStart(...args: unknown[]) {
	try {
		const Sentry: any = await import('@sentry/nextjs');
		if (Sentry && typeof Sentry.captureRouterTransitionStart === 'function') {
			// call with apply to avoid tuple/spread type errors
			return Sentry.captureRouterTransitionStart.apply(null, args as any);
		}
	} catch (err) {
		// If the SDK isn't available or import fails, just noop.
	}
}