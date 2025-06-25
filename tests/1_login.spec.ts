import { expect } from "@playwright/test";
import { test } from './fixture/fixtures' 

test('Login', async ({loggedInPage}) => {
   const {loginPage} = loggedInPage;

   const email = process.env.LOGIN_EMAIL!;
   const password = process.env.LOGIN_PASSWORD!;

await test.step('Navigate to the login page', async () => {
   await loginPage.page.goto('/auth/login');
});

await test.step('Fill and submit login form', async () => {
await loginPage.login(email, password);
});

await test.step('Verify user is on account page and sees correct data', async () => {
await expect(loginPage.page).toHaveURL('/account');
await expect(loginPage.myAccountTitle).toContainText('My account');
await expect(loginPage.menuButton).toContainText('Jane Doe');
});
});