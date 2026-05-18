import { test, expect } from '@playwright/test';
import { expectMainNavLinks } from './helpers/navigation';
test.describe('About Us', () => { 
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Rooster/);
  });

  test('has navigation links', async ({ page }) => {
    await expectMainNavLinks(page);
  });
});
