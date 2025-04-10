import { test, expect } from "@playwright/test";

test('Login', async ({page}) => {
    const emailLocator = '[data-test="email"]';
    const passwordLocator = '[data-test="password"]';
    const loginButtonLocator = '[data-test="login-submit"]';

await page.goto('https://practicesoftwaretesting.com/auth/login');
await page.locator(emailLocator).fill('customer@practicesoftwaretesting.com');
await page.locator(passwordLocator).fill('welcome01');
await page.locator(loginButtonLocator).click();

await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
await expect(page.locator('[data-test="page-title"]')).toContainText('My account');
await expect(page.locator('[data-test="nav-menu"]')).toContainText('Jane Doe');
});