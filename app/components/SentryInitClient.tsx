"use client";
import { useEffect } from 'react';

export default function SentryInitClient() {
  useEffect(() => {
    (async () => {
      try {
        const mod = await import('../../instrumentation-client');
        if (mod && typeof mod.initSentryClient === 'function') {
          await mod.initSentryClient();
        }
      } catch (e) {
        // don't crash the app if Sentry import fails
        // eslint-disable-next-line no-console
        console.warn('Sentry init failed', e);
      }
    })();
  }, []);
  return null;
}
