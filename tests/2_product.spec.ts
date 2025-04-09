import { test, expect } from "@playwright/test";

test('Login', async ({page}) => {
    const productLocator = 'text=Combination Pliers';

await page.goto('https://practicesoftwaretesting.com ');
await page.locator(productLocator).click();

await expect(page).toHaveURL('https://practicesoftwaretesting.com/product/01JR8SZXFEW1TMY727QKDWQEQN');
await expect(page.locator('[data-test="product-name"]')).toContainText('Combination Pliers');
await expect(page.locator('[data-test="unit-price"]')).toContainText('14.15');
await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
await expect(page.locator('[data-test="add-to-favorites"]')).toBeVisible();

})