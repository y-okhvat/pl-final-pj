import { test, expect } from "@playwright/test";
import {ProductPage} from '../pages/ProductPage';

test('Should display correct product info on product page', async ({page}) => {
    const productPage = new ProductPage(page) ;

await page.goto('https://practicesoftwaretesting.com');


const nameFromList = await productPage.getNameFromList();
const priceFromList = await productPage.getPriceFromList();

await productPage.openFirstProduct();

const nameOnPage = await productPage.getNameFromProductPage();
const priceOnPage = await productPage.getPriceFromProductPage();

expect(nameOnPage).toBe(nameFromList);
expect(Number(priceOnPage.replace('$', ''))).toBe(Number(priceFromList.replace('$', '')));

await expect(productPage.addToCartButton).toBeVisible();
await expect(productPage.addToFavoritesButton).toBeVisible();
});


