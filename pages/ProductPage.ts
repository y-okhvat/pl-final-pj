import {Locator, Page} from "@playwright/test";

export class ProductPage {
    readonly page: Page;
    readonly firstProductNameInList: Locator;
    readonly firstProductPriceInList: Locator;
    readonly productNameOnPage: Locator;
    readonly productPriceOnPage: Locator;
    readonly cartIconLocator: Locator;
    readonly addToCartButton: Locator;
    readonly addToFavoritesButton: Locator;
    readonly productNameList: Locator;
     constructor (page: Page) {
        this.page = page;
         this.firstProductNameInList = page.getByTestId("product-name").first();
         this.firstProductPriceInList = page.getByTestId("product-price").first();
         this.productNameOnPage = page.getByTestId("product-name");
         this.productPriceOnPage = page.getByTestId("unit-price");
         this.cartIconLocator = page.getByTestId("nav-cart");
         this.addToCartButton = page.getByTestId("add-to-cart");
         this.addToFavoritesButton = page.getByTestId("add-to-favorites");
         this.productNameList = page.getByTestId("product-name");

    }
    async openFirstProduct(): Promise<void> {
        await this.firstProductNameInList.click();
      }

      async getNameFromList(): Promise<string> {
        return await this.firstProductNameInList.innerText();
      }

      async getPriceFromList(): Promise<string> {
        return await this.firstProductPriceInList.innerText();
      }

      async getNameFromProductPage(): Promise<string> {
        return await this.productNameOnPage.innerText();
      }

      async getPriceFromProductPage(): Promise<string> {
        return await this.productPriceOnPage.innerText();
      }

      async addToCart(): Promise<void> {
        await this.addToCartButton.click();
      }

      async goToCart(): Promise<void> {
        await this.cartIconLocator.click();
      }

}


