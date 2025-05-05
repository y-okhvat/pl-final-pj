import {Locator, Page} from "@playwright/test";

export class productPage {
    page: Page;
    productLocator: Locator;
    cartLocator:Locator;
    cartIconLocator: Locator;
    addToCartButton: Locator;
    constructor (page: Page) {
        this.page = page;
         this.productLocator = this.page.locator('text=Slip Joint Pliers');
         this.cartLocator = this.page.locator('[data-test="add-to-cart"]');
         this.cartIconLocator = this.page.locator('[data-test="nav-cart"]');
         this.addToCartButton = this.page.locator('[data-test="add-to-cart"]')

    }

    async addToCart(): Promise<void> {
        await this.addToCartButton.click(); 
    
}
     async goToCart(): Promise<void> {
         await this.cartIconLocator.click();
}
}


