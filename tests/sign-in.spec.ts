import { test, expect } from '@playwright/test';
import { expectMainNavLinks } from './helpers/navigation';
test.describe('Sign In', () => { 
    test.beforeEach(async ({ page }) => {
        await page.goto('/sign-in');
    });
    
    test.describe('Page Elements', () => {
        test('has title', async ({ page }) => {
            await expect(page).toHaveTitle(/Rooster/);
        });

        test('has navigation links', async ({ page }) => {
            await expectMainNavLinks(page);
        });

        test('has sign in form', async ({ page }) => {
            await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
            await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
            await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
        });

        test('has sign-up link', async ({ page }) => {
            const signUpLink = await page.getByRole('link', {name: "Sign Up Here"})
            await expect(signUpLink).toBeVisible();
            await expect(signUpLink).toHaveAttribute('href', '/sign-up');
        });
            
        test('has forgot password link', async ({ page }) => {
            const forgotPasswordLink = await page.getByRole('link', { name: 'Forgot Password?' })
            await expect(forgotPasswordLink).toBeVisible();
            await expect(forgotPasswordLink).toHaveAttribute('href', '/forgot-password');
        });
    });

    test.describe.skip('User Sign In', () => {
        // TODO: Implement user sign in tests
        test('successfully signs in with valid cookie', async ({ page }) => {
        });

        test('cannot sign in with invalid cookie', async ({ page }) => {
        });
    });
});
