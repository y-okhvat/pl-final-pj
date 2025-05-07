import { test, expect } from "@playwright/test";
import {LoginPage} from '../pages/loginPage';

test('Login', async ({page}) => {
   const loginPage = new LoginPage(page)

   const email = process.env.LOGIN_EMAIL!;
   const password = process.env.LOGIN_PASSWORD!;

await test.step('Navigate to the login page', async () => {
   await page.goto('/auth/login');
});

await test.step('Fill and submit login form', async () => {
await loginPage.login(email, password);
});

await test.step('Verify user is on account page and sees correct data', async () => {
await expect(page).toHaveURL('/account');
await expect(loginPage.myAccountTitle).toContainText('My account');
await expect(loginPage.menuButton).toContainText('Jane Doe');
});
});