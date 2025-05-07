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
    readonly productNameListOnHomePage: Locator;
    readonly cartAlertMessage: Locator;
    readonly itemTitleInCart: Locator;
    readonly proceedToCheckoutButtonInCart: Locator;
    readonly cartQuantityBadge: Locator;
    
     constructor (page: Page) {
        this.page = page;
         this.firstProductNameInList = page.getByTestId("product-name").first();
         this.firstProductPriceInList = page.getByTestId("product-price").first();
         this.productNameOnPage = page.getByTestId("product-name");
         this.productPriceOnPage = page.getByTestId("unit-price");
         this.cartIconLocator = page.getByTestId("nav-cart");
         this.addToCartButton = page.getByTestId("add-to-cart");
         this.addToFavoritesButton = page.getByTestId("add-to-favorites");
         this.productNameListOnHomePage = page.getByTestId("product-name");
         this.cartAlertMessage = page.getByRole("alert");
         this.itemTitleInCart = page.getByTestId("product-title");
         this.proceedToCheckoutButtonInCart = page.getByTestId("proceed-1");
         this.cartQuantityBadge = page.getByTestId("cart-quantity");
         

    }
    async openFirstProduct(): Promise<void> {
        await this.firstProductNameInList.click();
      }

      async getFirstProductName(): Promise<string> {
        return await this.firstProductNameInList.innerText();
      }

      async getFirstProductPrice(): Promise<string> {
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


