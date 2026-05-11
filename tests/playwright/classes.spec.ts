import { test, expect } from '@playwright/test';
import { expectMainNavLinks } from './helpers/navigation';
test.describe('Classes', () => { 
  test.beforeEach(async ({ page }) => {
    await page.goto('/classes');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Rooster/);
  });

  test('has navigation links', async ({ page }) => {
    await expectMainNavLinks(page);
  });
});
