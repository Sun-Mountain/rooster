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

  test('shows the public class directory', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Find your next class' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Spring 2027' })).toBeVisible();
  });

  test('shows live class offerings and their details', async ({ page }) => {
    const silksCard = page.getByRole('article').filter({ hasText: 'test silks' });
    const trapezeCard = page.getByRole('article').filter({ hasText: 'test trapeze' });

    await expect(silksCard).toBeVisible();
    await expect(silksCard).toContainText('$180.00');
    await expect(silksCard).toContainText('Monday 18:00 - 19:30');
    await expect(silksCard).toContainText('12 spots');

    await expect(trapezeCard).toBeVisible();
    await expect(trapezeCard).toContainText('$195.00');
    await expect(trapezeCard).toContainText('Wednesday 19:00 - 20:30');
    await expect(trapezeCard).toContainText('10 spots');
  });
});
