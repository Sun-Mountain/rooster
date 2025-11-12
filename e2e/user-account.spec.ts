import { test, expect } from '@playwright/test';
import { createTestContext, signUp, signIn, signOut } from './spec.helpers';

test.describe('User Account', () => {
  const ctx = createTestContext();

  test('can navigate to settings page from account menu', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/');
    const accountMenuButton = page.getByRole('button', { name: 'Account' });
    await accountMenuButton.click();
    const settingsLink = page.getByRole('link', { name: 'Settings' });
    await settingsLink.click();
    await expect(page).toHaveURL('/settings');
  });

  test('account form is populated with user data', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/settings');
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    const emailInput = page.getByLabel('Email');
    await expect(firstNameInput).toHaveValue(ctx.firstName);
    await expect(lastNameInput).toHaveValue(ctx.lastName);
    await expect(emailInput).toHaveValue(ctx.email);
  });
});