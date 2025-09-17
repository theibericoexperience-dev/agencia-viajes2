#!/usr/bin/env node

// Query Sentry Issues API for a release
// Usage: SENTRY_AUTH_TOKEN=... SENTRY_ORG=... SENTRY_PROJECT=... SENTRY_RELEASE=... node scripts/check-sentry.js

(async function main() {
  const token = process.env.SENTRY_AUTH_TOKEN;
  const org = process.env.SENTRY_ORG || 'iberico-experience';
  const project = process.env.SENTRY_PROJECT || 'javascript-nextjs';
  const release = process.env.SENTRY_RELEASE || 'a391903631fc4bab444adf8ede93667d23e457fc';
  const statsPeriod = process.env.SENTRY_STATS_PERIOD || '24h';

  if (!token) {
    console.error('SENTRY_AUTH_TOKEN not set in env');
    process.exit(1);
  }

  const url = `https://sentry.io/api/0/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/?query=release:${encodeURIComponent(release)}&statsPeriod=${encodeURIComponent(statsPeriod)}`;
  console.log('Querying Sentry for issues:', url);

  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    const text = await res.text();
    console.log('Sentry response status:', res.status);
    try {
      const json = JSON.parse(text);
      console.log(JSON.stringify(json, null, 2));
    } catch (e) {
      console.log(text);
    }
  } catch (err) {
    console.error('Error querying Sentry:', err);
    process.exit(2);
  }
})();
