import { test, expect } from "@playwright/test";
import {LoginPage} from '../pages/loginPage';

test('Login', async ({page}) => {
   const loginPage = new LoginPage(page)

await page.goto('https://practicesoftwaretesting.com/auth/login');
await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');


await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
await expect(page.getByTestId("page-title")).toContainText('My account');
await expect(page.getByTestId("nav-menu")).toContainText('Jane Doe');
});