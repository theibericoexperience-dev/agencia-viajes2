import { test, expect } from '@playwright/test';

test('homepage loads and screenshot', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'artifacts/homepage.png', fullPage: true });
});
