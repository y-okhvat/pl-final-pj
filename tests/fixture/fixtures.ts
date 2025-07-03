import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/home/home.page';
import { ProductPage } from '../../pages/ProductPage';
import {CartPage} from '../../pages/cartPage'
import {BillingPage} from '../../pages/billingPage'
import {SignInPage} from '../../pages/signInPage'
import {CheckoutPage} from '../../pages/checkoutPage'
import {expect}  from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
    billingPage: BillingPage;
    signInPage: SignInPage;
    checkoutPage: CheckoutPage;
    loggedInPage: {
        loginPage: LoginPage;
        homePage: HomePage;
        productPage: ProductPage;
        cartPage: CartPage;
        billingPage: BillingPage;
        signInPage: SignInPage;
        checkoutPage: CheckoutPage;
    };
};

export const test = baseTest.extend<MyFixtures>({
    loginPage: async ({page}, use) => {
        const loginPage = new LoginPage(page);
        await use (loginPage);
    },

    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use (homePage);
    },

      productPage: async ({page}, use) => {
        const productPage = new ProductPage(page);
        await use (productPage);
    },

     cartPage: async ({page}, use) => {
        const cartPage = new CartPage(page);
        await use (cartPage);
    },

    billingPage: async ({page}, use) => {
        const billingPage = new BillingPage(page);
        await use (billingPage);
    },

    signInPage: async ({page}, use) => {
        const signInPage = new SignInPage(page);
        await use (signInPage);
    },
    
    checkoutPage: async ({page}, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use (checkoutPage);
    },

loggedInPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const billingPage = new BillingPage(page);
    const signInPage = new SignInPage(page);
    const checkoutPage = new CheckoutPage(page);

    await page.goto('/auth/login');
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL('/account');

    await use({loginPage, homePage, productPage, cartPage, billingPage, signInPage, checkoutPage});
}
    
}); 