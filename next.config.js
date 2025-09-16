const { withSentryConfig } = require("@sentry/nextjs");

/** @type {import('next').NextConfig} */
const baseConfig = {
  output: 'standalone',
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
