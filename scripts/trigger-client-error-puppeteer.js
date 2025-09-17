(async () => {
  const target = process.env.TARGET_URL || 'https://agencia-viajes2-frjhdxuhi-theibericoexperience-devs-projects.vercel.app/sentry-test';
  console.log('TARGET', target);
  try {
    const puppeteer = require('puppeteer');
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    // Capture requests and responses to Sentry
    const sentryRequests = [];
    const sentryResponses = [];
    await page.setRequestInterception(true);
    page.on('request', req => {
      const url = req.url();
      if (url.includes('sentry.io') || url.includes('sentry-cdn.com')) {
        sentryRequests.push({ url, method: req.method(), headers: req.headers() });
      }
      req.continue().catch(() => {});
    });
    page.on('response', async res => {
      try {
        const url = res.url();
        if (url.includes('sentry.io') || url.includes('sentry-cdn.com')) {
          const headers = res.headers();
          let body = null;
          try {
            const ct = headers['content-type'] || '';
            if (ct.includes('application/json') || ct.includes('text/plain')) {
              body = await res.text();
            }
          } catch (e) {
            body = `<unreadable: ${String(e)}>`;
          }
          sentryResponses.push({ url, status: res.status(), headers, body });
        }
      } catch (e) {
        // ignore
      }
    });

    page.on('console', msg => console.log('PAGE>', msg.text()));

    console.log('Opening page...');
    await page.goto(target, { waitUntil: 'networkidle2', timeout: 30000 });
    console.log('Page loaded');

    // Try to click a button that triggers the client error
    const btnSelectors = [
      'text/Throw test error',
      'text/Trigger error',
      'button',
    ];
    let clicked = false;
    for (const sel of btnSelectors) {
      try {
        const el = await page.$(sel);
        if (el) { await el.click(); clicked = true; console.log('Clicked', sel); break; }
      } catch (e) {
        // ignore
      }
    }
    if (!clicked) {
      console.log('No target button found; attempting to click first button if present');
      const firstBtn = await page.$('button');
      if (firstBtn) { await firstBtn.click(); clicked = true; console.log('Clicked first button'); }
    }

  // Wait for network activity
  await new Promise((res) => setTimeout(res, 5000));

    console.log('Captured Sentry requests:', sentryRequests.length);
    for (const r of sentryRequests) {
      console.log('SENTRY REQ:', r.method, r.url);
      if (r.headers && (r.headers['x-sentry-error'] || r.headers['x-sentry-warning'])) console.log('x-sentry-error/warning:', r.headers['x-sentry-error'] || r.headers['x-sentry-warning']);
    }
    console.log('Captured Sentry responses:', sentryResponses.length);
    for (const res of sentryResponses) {
      console.log('SENTRY RES:', res.status, res.url);
      if (res.headers) console.log('Response headers:', JSON.stringify(res.headers, null, 2));
      if (res.body) console.log('Response body:', res.body);
    }

    await browser.close();
    if (sentryRequests.length === 0) {
      console.log('No Sentry network requests detected. Client may not be instrumented or DSN missing.');
      process.exit(1);
    }
    process.exit(0);
  } catch (e) {
    console.error('Error running Puppeteer script:', e);
    process.exit(2);
  }
})();
