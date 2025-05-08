import { test, expect } from "@playwright/test";
import { ProductPage } from '../pages/ProductPage';

test('Add Slip Joint Pliers to cart and verify', async ({page}) => {
    const productPage = new ProductPage(page) ;

    await test.step('Navigate to the home page', async () => {
    await page.goto('/');
    });

    await test.step('Open product details page', async () => {
    await productPage.productNameListOnHomePage.filter({ hasText: "Slip Joint Pliers" }).first().click();
    });
    
    await test.step('Verify product name and price match', async () => {
    await expect(productPage.productNameOnPage).toContainText('Slip Joint Pliers');
    await expect(productPage.productPriceOnPage).toContainText('9.17');
    });

    await test.step('Add product to cart', async () => {
    await productPage.addToCart();
    });

    await test.step('Verify carts alert message', async () => {
    const cartMessage = productPage.cartAlertMessage;
    
    await expect(cartMessage).toBeVisible({timeout: 10000});
    await expect(cartMessage).toContainText("Product added to shopping cart.");
    await expect(cartMessage).toBeHidden({timeout: 10000});
    await expect(productPage.cartQuantityBadge).toContainText('1');
    });

    await test.step('Navigate to the checkout page and verify product name and price match', async () => {
    await productPage.goToCart();
   
    await expect(page).toHaveURL('/checkout');
    await expect(productPage.cartQuantityBadge).toContainText('1');
    await expect(productPage.itemTitleInCart).toContainText('Slip Joint Pliers ');
    await expect(productPage.proceedToCheckoutButtonInCart).toBeVisible();
    });
});