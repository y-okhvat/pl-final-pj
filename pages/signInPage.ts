import {Locator, Page, expect } from "@playwright/test";

export class SignInPage {
    readonly page: Page;
  readonly loggedInMessage: Locator;
  readonly proceedButton: Locator;

  constructor (page: Page) {
    this.page = page;
    this.loggedInMessage = page.getByText(/you are already logged in/i);
    this.proceedButton = page.getByTestId("proceed-2");
}
 async expectLoggedInMessageVisible(): Promise<void> {
        await expect(this.loggedInMessage).toBeVisible({ timeout: 10000 });
    }
  
  async proceedToBilling(): Promise<void> {
    await this.proceedButton.click();
  }
}