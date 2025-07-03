import {Locator, Page} from "@playwright/test";

export class BillingPage {
    readonly page: Page;
    readonly stateInput: Locator;
    readonly postalCodeInput: Locator;
    readonly proceedToCheckoutButton: Locator;

    constructor (page: Page) {
    this.page = page;
    this.stateInput = page.getByTestId("state");
    this.postalCodeInput = page.getByTestId("postal_code");
    this.proceedToCheckoutButton = page.getByTestId("proceed-3");
  } 

  async fillBillingForm(state: string, postalCode: string): Promise<void> {
    await this.stateInput.fill(state);
    await this.postalCodeInput.fill(postalCode);
    await this.proceedToCheckoutButton.click(); 
}
}