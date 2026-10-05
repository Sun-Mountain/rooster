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
            await expect(page.getByRole('heading', { name: 'Welcome back' })).toBeVisible();
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
            await expect(forgotPasswordLink).toHaveAttribute('href', '/password');
        });
    });

    test('shows a warning after an unsuccessful sign in', async ({ page }) => {
        await page.route('**/api/auth/sign-in/email', async (route) => {
            await route.fulfill({
                status: 401,
                contentType: 'application/json',
                body: JSON.stringify({
                    error: {
                        message: 'Invalid email or password',
                    },
                }),
            });
        });

        await page.getByRole('textbox', { name: 'Email' }).fill('unknown@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('incorrect-password');
        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page.getByRole('alert')).toBeVisible();
    });

    test('redirects to the profile after a successful sign in', async ({ page }) => {
        await page.route('**/api/auth/sign-in/email', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({}),
            });
        });
        await page.route('**/profile', async (route) => {
            await route.fulfill({
                status: 200,
                contentType: 'text/html',
                body: '<html><body><h1>Account Information</h1></body></html>',
            });
        });

        await page.getByRole('textbox', { name: 'Email' }).fill('member@example.com');
        await page.getByRole('textbox', { name: 'Password' }).fill('correct-password');
        await page.getByRole('button', { name: 'Sign In' }).click();

        await expect(page).toHaveURL(/\/profile$/);
    });
});
