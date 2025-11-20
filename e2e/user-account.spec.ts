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
    const accountLink = page.getByRole('link', { name: 'Account' });
    await accountLink.click();
    await expect(page).toHaveURL('/account');
    await signOut(page);
  });

  test('account form is populated with user data', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/account');
    await page.getByRole('button', { name: 'Edit Account Information' }).click();
    await expect(page.getByRole('heading', { name: 'Edit Account Info' })).toBeVisible();
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    const emailInput = page.getByLabel('Email');
    await expect(firstNameInput.first()).toHaveValue(ctx.firstName);
    await expect(lastNameInput.first()).toHaveValue(ctx.lastName);
    await expect(emailInput.first()).toHaveValue(ctx.email);
    await signOut(page);
  });

  test('can update account information', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/account');
    await page.getByRole('button', { name: 'Edit Account Information' }).click();
    const firstNameInput = page.getByLabel('First Name');
    const lastNameInput = page.getByLabel('Last Name');
    const emailInput = page.getByLabel('Email');
    const newFirstName = 'UpdatedFirstName';
    const newLastName = 'UpdatedLastName';
    const newEmail = `updated-${ctx.email}`;
    await firstNameInput.first().fill(newFirstName);
    await lastNameInput.first().fill(newLastName);
    await emailInput.first().fill(newEmail);
    await page.getByRole('button', { name: 'Update Account' }).click();
    await expect(page.getByText(`Name: ${newFirstName} ${newLastName}`)).toBeVisible();
    await expect(page.getByText(`Email: ${newEmail}`)).toBeVisible();
    await signOut(page);
  });

  test('can add address and phone number', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/account');
    await expect(page.getByText('No address on file.')).toBeVisible();
    await expect(page.getByText('No phone number on file.')).toBeVisible();
    await page.getByRole('button', { name: 'Edit Account Information' }).click();
    const streetInput = page.getByLabel('Street');
    const cityInput = page.getByLabel('City');
    const stateInput = page.getByLabel('State');
    const zipCodeInput = page.getByLabel('Zip Code');
    const areaCodeInput = page.getByLabel('Area Code');
    const prefixInput = page.getByLabel('XXX', { exact: true }); 
    const lineNumberInput = page.getByLabel('XXXX', { exact: true });
    await streetInput.first().fill('123 Main St');
    await cityInput.first().fill('Anytown');
    await stateInput.first().fill('CA');
    await zipCodeInput.first().fill('12345');
    await areaCodeInput.first().fill('555');
    await prefixInput.first().fill('123');
    await lineNumberInput.first().fill('4567');
    await page.getByRole('button', { name: 'Update Account' }).click();
    await expect(page.getByText('No address on file.')).not.toBeVisible();
    await expect(page.getByText('No phone number on file.')).not.toBeVisible();
    await expect(page.getByText('123 Main St')).toBeVisible();
    await expect(page.getByText('Anytown, CA, 12345')).toBeVisible();
    await expect(page.getByText('555-123-4567')).toBeVisible();
    await signOut(page);
  });

  test('can add emergency contact', async ({ page }) => {
    await signUp(page, ctx);
    await signIn(page, ctx);
    await page.goto('/account');
    await expect(page.getByText('No emergency contact on file.')).toBeVisible();
    await page.getByRole('button', { name: 'Edit Account Information' }).click();
    const ecFirstNameInput = page.getByLabel('First Name');
    const ecLastNameInput = page.getByLabel('Last Name');
    const ecRelationshipInput = page.getByLabel('Relationship');
    const ecPhoneAreaCodeInput = page.getByLabel('Area Code');
    const ecPhonePrefixInput = page.getByLabel('XXX', { exact: true });
    const ecPhoneLineNumberInput = page.getByLabel('XXXX', { exact: true });
    await ecFirstNameInput.last().fill('Jane');
    await ecLastNameInput.last().fill('Doe');
    await ecRelationshipInput.last().fill('Sister');
    await ecPhoneAreaCodeInput.last().fill('555');
    await ecPhonePrefixInput.last().fill('987');
    await ecPhoneLineNumberInput.last().fill('6543');
    await page.getByRole('button', { name: 'Update Account' }).click();
    await expect(page.getByText('No emergency contact on file.')).not.toBeVisible();
    await expect(page.getByText('Jane Doe (Sister)')).toBeVisible();
    await expect(page.getByText('555-987-6543')).toBeVisible();
    await signOut(page);
  });
});