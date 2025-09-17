const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'standalone',
  reactStrictMode: true,
  // Next.js handles minification; remove explicit swcMinify to avoid warnings
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    qualities: [60, 75, 90],
  },
  experimental: {
    optimizeCss: true,
  },
  // When Next.js detects multiple package lockfiles it may infer the wrong
  // workspace root. Setting `outputFileTracingRoot` ensures correct tracing
  // for standalone output.
  outputFileTracingRoot: __dirname,
  async headers() {
    return [
      {
        // Cache static _next files for a long time (immutable)
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache other static assets and optimized images
        source: '/_optimized/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Generic long caching for images and other build-time assets
        source: '/:path*\.(js|css|png|jpg|jpeg|webp|avif|svg)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

// We opt out of the `withSentryConfig` wrapper so the Sentry Next.js plugin
// doesn't inject client-side instrumentation at build time. Client init is
// handled explicitly by `instrumentation-client.ts` in the app code.
// To re-enable the plugin, restore the following pattern:
//
// const sentryOptions = { org: 'iberico-experience', project: 'javascript-nextjs', /* ... */ };
// module.exports = withSentryConfig(baseConfig, sentryOptions);
//
module.exports = baseConfig;
