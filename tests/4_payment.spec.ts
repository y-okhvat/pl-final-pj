import { expect } from "@playwright/test";
import { CartPage } from '../pages/cartPage';
import { BillingPage } from '../pages/billingPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { SignInPage } from "../pages/signInPage";
import {test} from './fixture/fixtures'

function getExpirationDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 3);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());
  return `${month}/${year}`;
}

test ('Checkout test', async ({loggedInPage}) => {
    const {homePage, productPage} = loggedInPage;
    const cartPage = new CartPage(homePage.page);
    const billingPage = new BillingPage (homePage.page);
    const signInPage = new SignInPage(homePage.page);
    const checkoutPage = new CheckoutPage (homePage.page);

    let productName: string;
    let productPrice: number;


    await test.step('Add product to cart', async () => {
        await homePage.goto()
        await productPage.openFirstProduct()

        productName = await productPage.getNameFromProductPage();
        productPrice = await productPage.getPriceFromProductPage();

        await productPage.addToCart();
        await productPage.goToCart();
    });

   await test.step('Check that info abot product is the same in cart', async () => {
    const cartProductName = await cartPage.getProductTitle();
    const cartProductPrice = await cartPage.getProductPrice();
    const cartTotal = await cartPage.getTotalPrice();
 
    expect (cartProductName).toBe(productName);
    expect (cartProductPrice).toBe(productPrice);
    expect (cartTotal).toBe(productPrice)

   });

   await test.step('Go to checkout', async () => {
    await cartPage.proceedToCheckout();
});

 await test.step('Verify user is already logged in', async () =>{
    await signInPage.expectLoggedInMessageVisible();
    await signInPage.proceedToBilling();
 });

 await test.step('Fill Billing Address', async() => {
await billingPage.fillBillingForm('Florida', '111111')
 });
    
 await test.step('Choose payment method', async() => {
await checkoutPage.selectPaymentMethod();
 });
 
 await test.step('Fill payment form', async () => {
    const expirationDate = getExpirationDate();
    await checkoutPage.fillPaymentForm(
      '1111-1111-1111-1111',
      expirationDate,
      '111',
      'Jane Doe'
    );
  });


  await test.step('Confirm payment and verify success message', async () => {
  await checkoutPage.confirmPayment();
  await checkoutPage.expectPaymentSuccess();
});

})