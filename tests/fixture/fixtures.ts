import {test as baseTest} from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
import { HomePage } from '../../pages/home/home.page';
import { ProductPage } from '../../pages/ProductPage';
import {expect}  from '@playwright/test';

type MyFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
    productPage: ProductPage;
    loggedInPage: {
        loginPage: LoginPage;
        homePage: HomePage;
        productPage: ProductPage;
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

loggedInPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await page.goto('/auth/login');
    await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');

    await expect(page).toHaveURL('/account');

    await use({loginPage, homePage, productPage});
}
    
}); 