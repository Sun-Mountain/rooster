import { test, expect } from '@playwright/test';

test('has welcome page', async ({ page }) => {
  await page.goto('/');
  const title = page.getByRole('heading', { name: 'Welcome to Rooster' });
  await expect(title).toBeVisible();
});

test('has nav bar', async ({ page }) => {
  await page.goto('/');
  const navBar = page.getByRole('navigation');
  await expect(navBar).toBeVisible();
  const homeLink = navBar.getByRole('link', { name: 'Home' });
  const signUpLink = navBar.getByRole('link', { name: 'Sign Up' });
  const signInLink = navBar.getByRole('link', { name: 'Sign In' });
  await expect(homeLink).toBeVisible();
  await expect(signUpLink).toBeVisible();
  await expect(signInLink).toBeVisible();
});

test('has footer', async ({ page }) => {
  await page.goto('/');
  const footer = page.getByTestId('contentinfo');
  await expect(footer).toBeVisible();
});