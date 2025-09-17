(async () => {
  const target = process.env.TARGET_URL || 'http://localhost:3003/sentry-test';
  console.log('TARGET', target);
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    const sentryRequests = [];
    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (url.includes('sentry.io') || url.includes('sentry-cdn.com')) {
        sentryRequests.push({ url, method: req.method(), headers: req.headers() });
      }
      req.continue().catch(() => {});
    });

    page.on('console', msg => console.log('PAGE>', msg.text()));

    await page.goto(target, { waitUntil: 'networkidle2', timeout: 30000 });

    // inspect window for Sentry
    const hasSentry = await page.evaluate(() => {
      try {
        // @ts-ignore
        return !!(window.Sentry || window.__SENTRY__ || (window.__sentry__ && Object.keys(window.__sentry__).length));
      } catch (e) { return false; }
    });
    console.log('Client has Sentry global:', hasSentry);

    // inject an uncaught error to force client-side Sentry capture
    await page.evaluate(() => {
      setTimeout(() => { throw new Error('triggered-by-script'); }, 0);
    });

    // Allow some time for the error to be captured and sent
    await new Promise(res => setTimeout(res, 5000));

    console.log('Captured Sentry requests:', sentryRequests.length);
    for (const r of sentryRequests) console.log('SENTRY REQ:', r.method, r.url);

    await browser.close();
    if (sentryRequests.length === 0) process.exit(1);
    process.exit(0);
  } catch (e) {
    console.error('Script error', e);
    process.exit(2);
  }
})();
