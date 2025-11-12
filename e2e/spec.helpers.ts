import { expect } from "@playwright/test";
import type { Page } from "@playwright/test";

type TestContext = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

let cachedTestCtx: TestContext | null = null;

export function testContext(): TestContext {
  if (!cachedTestCtx) {
    const timestamp = new Date().getTime();
    cachedTestCtx = {
      firstName: `Test${timestamp}`,
      lastName: `User${timestamp}`,
      email: `${timestamp}+testuser@example.com`,
      password: "tD20xt6h0m3!",
    };
  }
  return cachedTestCtx;
}

export const createTestContext = () => {
  const timestamp = Date.now();
  return {
    firstName: `Test${timestamp}`,
    lastName: `User${timestamp}`,
    email: `${timestamp}+testuser@example.com`,
    password: 'S0me-R@ndom-P@ssword!'
  };
};

export async function signUp(page: Page, ctx: TestContext) {
  await page.goto("/sign-up");
  await page.getByLabel("First Name").click();
  await page.getByLabel("First Name").fill(ctx.firstName);
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill(ctx.lastName);
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(ctx.email);
  await page.getByRole("textbox", { name: "Password", exact: true }).click();
  await page.getByRole("textbox", { name: "Password", exact: true }).fill(ctx.password);
  await page.getByRole("textbox", { name: "Confirm Password", exact: true }).click();
  await page.getByRole("textbox", { name: "Confirm Password", exact: true }).fill(ctx.password);
  await page.getByRole("button", { name: "Sign Up", exact: true }).click({force:true});
  await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
};

export async function signIn(page: Page, ctx: TestContext) {
  await page.getByLabel("Email").click();
  await page.getByLabel("Email").fill(ctx.email);
  await page.getByRole("textbox", { name: "Password", exact: true }).click();
  await page.getByRole("textbox", { name: "Password", exact: true }).fill(ctx.password);
  await page.getByRole("button", { name: "Sign In", exact: true }).click();
  await expect(page.locator('button[aria-label="Open account menu"]')).toBeVisible();
};

export async function signOut(page: Page) {
  await page.locator('button[aria-label="Open account menu"]').click();
  await expect(page.locator('button[aria-label="Sign out of the application"]')).toBeVisible();
  await page.locator('button[aria-label="Sign out of the application"]').click();
  await expect(page.locator('button[aria-label="Open account menu"]')).not.toBeVisible();
  await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
  
};