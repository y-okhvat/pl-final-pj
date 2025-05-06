import { test, expect } from "@playwright/test";
import { ProductPage } from '../pages/ProductPage';

test('Add Slip Joint Pliers to cart and verify', async ({page}) => {
    const productPage = new ProductPage(page) ;


    await page.goto('https://practicesoftwaretesting.com');
    await productPage.productNameList.filter({ hasText: "Slip Joint Pliers" }).first().click();
    
    await expect(page.getByTestId("product-name")).toContainText('Slip Joint Pliers');
    await expect(page.getByTestId("unit-price")).toContainText('9.17');

    await productPage.addToCart();

    const cartMessage = page.locator('[aria-label="Product added to shopping cart."]');
    await expect(cartMessage).toBeVisible({timeout: 10000});
    await expect(cartMessage).toContainText("Product added to shopping cart.");
    await expect(cartMessage).toBeHidden({timeout: 10000});
    await expect(page.getByTestId("cart-quantity")).toContainText('1');

    await productPage.goToCart();
   
    await expect(page).toHaveURL('https://practicesoftwaretesting.com/checkout');
    await expect(page.getByTestId("cart-quantity")).toContainText('1');
    await expect(page.getByTestId("product-title")).toContainText('Slip Joint Pliers ');
    await expect(page.getByTestId("proceed-1")).toBeVisible();

});