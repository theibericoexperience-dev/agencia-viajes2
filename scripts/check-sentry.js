(async () => {
  const token = process.env.SENTRY_AUTH_TOKEN;
  const org = process.env.SENTRY_ORG || 'iberico-experience';
  const project = process.env.SENTRY_PROJECT || 'javascript-nextjs';
  const release = process.env.SENTRY_RELEASE || '1.0.1';

  if (!token) return console.error('SENTRY_AUTH_TOKEN not set in env');

  try {
    const url = `https://sentry.io/api/0/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/?query=release:${encodeURIComponent(release)}&statsPeriod=1h`;
    console.log('Querying Sentry for issues:', url);
    const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    const text = await res.text();
    console.log('Sentry response status:', res.status);
    try { console.log(JSON.stringify(JSON.parse(text), null, 2)); } catch (e) { console.log(text); }
  } catch (e) {
    console.error('Error querying Sentry:', e);
    process.exit(2);
  }
})();
