import { test, expect } from "@playwright/test";
import {productPage} from '../pages/ProductPage';

test('Login', async ({page}) => {
    const productLocator = new productPage(page) ;

await page.goto('https://practicesoftwaretesting.com/product/01JTG52YNVXSE95JS37D3QQ2Q6');


await expect(page).toHaveURL('https://practicesoftwaretesting.com/product/01JTG52YNVXSE95JS37D3QQ2Q6');
await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();

});