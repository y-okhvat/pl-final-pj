import {Locator, Page} from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailLocator: Locator;
  readonly password: Locator;
  readonly submitButton: Locator;
  readonly myAccountTitle: Locator;
  readonly menuButton: Locator;
  
  constructor (page: Page) {
    this.page = page;
    this.emailLocator = page.getByTestId("email");
    this.password = page.getByTestId("password");
    this.submitButton = page.getByTestId("login-submit");
    this.myAccountTitle = page.getByTestId("page-title");
    this.menuButton = page.getByTestId("nav-menu");
  }  


async login(email: string, password: string): Promise<void> {
    await this.emailLocator.fill(email);
    await this.password.fill(password);
    await this.submitButton.click(); 
}
}