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

module.exports = withSentryConfig(
  baseConfig,
  {
    org: "iberico-experience",
    project: "javascript-nextjs",
    silent: !process.env.CI,
    widenClientFileUpload: true,
    // tunnelRoute: "/monitoring", // uncomment to enable
    disableLogger: true,
    automaticVercelMonitors: true,
  }
);
