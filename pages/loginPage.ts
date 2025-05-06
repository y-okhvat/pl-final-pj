import {Locator, Page} from "@playwright/test";

export class LoginPage {
  page: Page;
  emailLocator: Locator;
  password: Locator;
  submitButton: Locator;
  constructor (page: Page) {
    this.page = page;
    this.emailLocator = page.getByTestId("email");
    this.password = page.getByTestId("password");
    this.submitButton = page.getByTestId("login-submit");
  }  


async login(email: string, password: string): Promise<void> {
    await this.emailLocator.fill(email);
    await this.password.fill(password);
    await this.submitButton.click(); 
}
}