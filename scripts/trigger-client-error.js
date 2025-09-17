(async () => {
  const url = process.env.TARGET_URL || 'https://agencia-viajes2-frjhdxuhi-theibericoexperience-devs-projects.vercel.app/sentry-test';
  try {
  const { chromium } = require('playwright');
  console.log('Launching headless browser');
  const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
    page.on('console', msg => console.log('PAGE_LOG>', msg.type(), msg.text()));
    console.log('Opening', url);
    await page.goto(url, { waitUntil: 'networkidle' });
    // Try to click the test button (try by text, fallback to first button)
    const btnTexts = ['Throw test error', 'Trigger error', 'Throw', 'Crash', 'Send test event', 'Send event'];
    let clicked = false;
    for (const text of btnTexts) {
      const btn = await page.$(`text="${text}"`);
      if (btn) { await btn.click(); clicked = true; console.log('Clicked button with text:', text); break; }
    }
    if (!clicked) {
      const firstBtn = await page.$('button');
      if (firstBtn) { await firstBtn.click(); clicked = true; console.log('Clicked first button'); }
    }
    // Wait a bit for network activity
    await page.waitForTimeout(3000);
  console.log('Done — closing browser');
    await browser.close();
    process.exit(0);
  } catch (e) {
    console.error('Error running Playwright script:', e);
    process.exit(2);
  }
})();
