import { test, expect } from '@playwright/test';
import { expectMainNavLinks } from './helpers/navigation';
test.describe('Sign Up', () => { 
    test.beforeEach(async ({ page }) => {
        await page.goto('/sign-up');
    });
    
    test.describe('Page Elements', () => {
        test('has title', async ({ page }) => {
            await expect(page).toHaveTitle(/Rooster/);
        });

        test('has navigation links', async ({ page }) => {
            await expectMainNavLinks(page);
        });

        test('has sign up form', async ({ page }) => {
            await expect(page.getByRole('textbox', { name: 'First Name' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Last Name' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Password', exact: true })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Confirm Password', exact: true })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
        });

        test('has sign-in links', async ({ page }) => {
            const mainContent = await page.getByRole('main')
            const signInLink = await mainContent.getByRole('link', {name: "Sign In"})
            await expect(signInLink).toBeVisible();
            await expect(signInLink).toHaveAttribute('href', '/sign-in');
            const forgotPasswordLink = await mainContent.getByRole('link', { name: 'Forgot Password?' })
            await expect(forgotPasswordLink).toBeVisible();
            await expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
        });
    });
});
