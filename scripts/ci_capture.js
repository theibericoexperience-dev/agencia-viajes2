const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {
  const url = process.env.VERCEL_URL || 'https://agencia-viajes2-gre310jqt-theibericoexperience-devs-projects.vercel.app';
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 900 });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
  await page.screenshot({ path: 'artifacts/screenshot_desktop.png', fullPage: true });
  await page.setViewport({ width: 375, height: 812 });
  await page.reload({ waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'artifacts/screenshot_mobile.png', fullPage: true });
  await browser.close();
  console.log('screenshots saved to artifacts/');
}

run().catch((e) => { console.error(e); process.exit(1); });
