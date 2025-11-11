import { test, expect } from '@playwright/test';

test('can navigate to sign up page', async ({ page }) => {
  await page.goto('/');
  const signUpLink = page.getByRole('link', { name: 'Sign Up' });
  await signUpLink.click();
  const signUpHeading = page.getByRole('heading', { name: 'Sign Up' });
  await expect(signUpHeading).toBeVisible();
});

test('can navigate to sign in page', async ({ page }) => {
  await page.goto('/');
  const signInLink = page.getByRole('link', { name: 'Sign In' });
  await signInLink.click();
  const signInHeading = page.getByRole('heading', { name: 'Sign In' });
  await expect(signInHeading).toBeVisible();
});

test('sign up form validation', async ({ page }) => {
  await page.goto('/sign-up');
  const submitButton = page.getByRole('button', { name: 'Sign Up' });
  await submitButton.click();
  const firstNameError = page.getByText('First name is required');
  const lastNameError = page.getByText('Last name is required');
  const emailError = page.getByText('Invalid email address');
  const passwordError = page.getByText('Password must be at least 6 characters');
  const missingConfirmPasswordError = page.getByText('Confirm password is required');
  await expect(firstNameError).toBeVisible();
  await expect(lastNameError).toBeVisible();
  await expect(emailError).toBeVisible();
  await expect(passwordError).toBeVisible();
  await expect(missingConfirmPasswordError).toBeVisible();
});

test('sign in form validation', async ({ page }) => {
  await page.goto('/sign-in');
  const submitButton = page.getByRole('button', { name: 'Sign In' });
  await submitButton.click();
  const emailError = page.getByText('Invalid email address');
  const passwordError = page.getByText('Password is required');
  await expect(emailError).toBeVisible();
  await expect(passwordError).toBeVisible();
});

test('sign up form password mismatch validation', async ({ page }) => {
  await page.goto('/sign-up');
  const firstNameInput = page.getByLabel('First Name');
  const lastNameInput = page.getByLabel('Last Name');
  const emailInput = page.getByLabel('Email');
  const passwordInput = page.getByLabel('Password', { exact: true });
  const confirmPasswordInput = page.getByLabel('Confirm Password');
  const submitButton = page.getByRole('button', { name: 'Sign Up' });

  await firstNameInput.fill('John');
  await lastNameInput.fill('Doe');
  await emailInput.fill('john.doe@example.com');
  await passwordInput.fill('password123');
  await confirmPasswordInput.fill('differentPassword');
  await submitButton.click();

  const confirmPasswordError = page.getByText('Passwords do not match');
  await expect(confirmPasswordError).toBeVisible();
});