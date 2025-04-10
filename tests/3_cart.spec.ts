import { test, expect } from "@playwright/test";

test('Login', async ({page}) => {
    const productLocator = 'text=Slip Joint Pliers';
    const cartLocator = '[data-test="add-to-cart"]';
   const cartIconLocator = '[data-test="nav-cart"]';


    await page.goto('https://practicesoftwaretesting.com');
    await page.locator(productLocator).click();

    await expect(page).toHaveURL('https://practicesoftwaretesting.com/product/01JRA36BZPT9NPYG3F8TF461J1');
    await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');

    await page.locator(cartLocator).click();
    await expect(page.locator('[aria-label="Product added to shopping cart."]')).toBeVisible();
    await expect(page.locator('[aria-label="Product added to shopping cart."]')).toContainText("Product added to shopping cart.");
    await page.waitForTimeout(8000);
    await expect(page.locator('[aria-label="Product added to shopping cart."]')).toBeHidden();
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');

    await page.locator(cartIconLocator).click();
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers ');
    await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();

});