import {Locator, Page} from "@playwright/test";

export class CartPage {
    readonly page: Page;
    readonly productTitleInCart: Locator;
    readonly productPriceInCart: Locator;
    readonly totalPriceInCart: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor (page: Page) {
    this.page = page;
    this.productTitleInCart = page.getByTestId("product-title");
    this.productPriceInCart = page.getByTestId("product-price");
    this.totalPriceInCart = page.getByTestId("cart-total");
    this.proceedToCheckoutButton = page.getByTestId("proceed-1");
  } 
  
  async getProductTitle(): Promise<string> {
       return  ((await this.productTitleInCart.innerText()).trim());
      }

  async getProductPrice(): Promise<number> {
    const priceText = await this.productPriceInCart.innerText();
        return this.parsePrice(priceText);
      }

 async getTotalPrice(): Promise<number> {
  const priceText = await this.totalPriceInCart.innerText()
        return this.parsePrice(priceText);
      }

       async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutButton.click();
      }

      private parsePrice (priceText: string): number {
        return parseFloat(priceText.trim().replace ('$', ''));
      }
}