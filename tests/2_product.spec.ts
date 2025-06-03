import { test, expect } from "@playwright/test";
import {ProductPage} from '../pages/ProductPage';
import { parsePrice } from "../utils/priceHelper";

test('Should display correct product info on product page', async ({page}) => {
    const productPage = new ProductPage(page) ;
    let nameFromList: string;
    let priceFromList:string;

await test.step('Navigate to the home page', async () => {
    await page.goto('/');
})

await test.step('Get product name and price on home page', async () => {
nameFromList = await productPage.getFirstProductName();
priceFromList = await productPage.getFirstProductPrice();
});

await test.step('Open first product details page', async () => {
await productPage.openFirstProduct();
});

await test.step('Verify product name and price match', async () => {
const nameOnPage = await productPage.getNameFromProductPage();
const priceOnPage = await productPage.getPriceFromProductPage();

expect(nameOnPage).toBe(nameFromList);
expect(parsePrice(priceOnPage)).toBe(parsePrice(priceFromList));

});

await test.step('Verify Add to Cart and Add to Favorites buttons are visible', async () => {
await expect(productPage.addToCartButton).toBeVisible();
await expect(productPage.addToFavoritesButton).toBeVisible();
});

});
