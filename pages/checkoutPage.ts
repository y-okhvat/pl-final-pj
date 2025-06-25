import {Locator, Page, expect} from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly paymentDropdown: Locator;
    readonly creditCardInput: Locator;
    readonly expirationDateInput: Locator;
    readonly cvvInput: Locator;
    readonly cardHolderNameInput: Locator;
    readonly confirmButton: Locator;
    readonly paymentSuccessMessage: Locator;


    constructor (page: Page) {
    this.page = page;
    this.paymentDropdown = page.getByTestId("payment-method");
    this.creditCardInput = page.getByTestId("credit_card_number");
    this.expirationDateInput = page.getByTestId("expiration_date");
    this.cvvInput = page.getByTestId("cvv");
    this.cardHolderNameInput = page.getByTestId("card_holder_name");
    this.confirmButton = page.getByTestId("finish");
    this.paymentSuccessMessage = page.getByTestId("payment-success-message");
    }

async selectPaymentMethod (): Promise<void> {
    await this.paymentDropdown.selectOption("credit-card");
}

async fillPaymentForm (cardNumber: string, date: string, cvv: string, holderName: string): Promise<void> {
    await this.creditCardInput.fill(cardNumber);
    await this.expirationDateInput.fill(date);
    await this.cvvInput.fill(cvv); 
    await this.cardHolderNameInput.fill(holderName);

}

async confirmPayment(): Promise<void> {
  await this.confirmButton.click();
}

async expectPaymentSuccess(): Promise<void> {
  await expect(this.paymentSuccessMessage).toBeVisible();
  await expect(this.paymentSuccessMessage).toHaveText('Payment was successful');
}
    }
