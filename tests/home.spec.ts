import { test, expect } from '@playwright/test';
import { expectMainNavLinks } from './helpers/navigation';
test.describe('Homepage', () => { 
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has title', async ({ page }) => {
    await expect(page).toHaveTitle(/Rooster/);
  });

  test('has navigation links', async ({ page }) => {
    await expectMainNavLinks(page);
  });

  test('has welcome message', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Welcome to Rooster' })).toBeVisible();
  });

});
