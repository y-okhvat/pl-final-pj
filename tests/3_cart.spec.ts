import { test, expect } from "@playwright/test";
import { productPage } from '../pages/ProductPage';

test('Login', async ({page}) => {
    const cartLocator = new productPage(page) ;


    await page.goto('https://practicesoftwaretesting.com');
    await cartLocator.productLocator.click();  

    
    await expect(page.locator('[data-test="product-name"]')).toContainText('Slip Joint Pliers');
    await expect(page.locator('[data-test="unit-price"]')).toContainText('9.17');

    await cartLocator.addToCart();

    const cartMessage = page.locator('[aria-label="Product added to shopping cart."]');
    await expect(cartMessage).toBeVisible({timeout: 10000});
    await expect(cartMessage).toContainText("Product added to shopping cart.");
    await expect(cartMessage).toBeHidden({timeout: 10000});
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');

    await cartLocator.goToCart();
   
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
    await expect(page.locator('[data-test="cart-quantity"]')).toContainText('1');
    await expect(page.locator('[data-test="product-title"]')).toContainText('Slip Joint Pliers ');
    await expect(page.locator('[data-test="proceed-1"]')).toBeVisible();

});