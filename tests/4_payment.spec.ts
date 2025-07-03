import { expect } from "@playwright/test";
import {test} from './fixture/fixtures'
import {getExpirationDate} from "../utils/dateHelper";


test ('Checkout test', async ({loggedInPage}) => {
    const {homePage, productPage, cartPage, billingPage, signInPage, checkoutPage} = loggedInPage;

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
    await checkoutPage.fillPaymentForm({
      cardNumber: '1111-1111-1111-1111',
      date: expirationDate,
      cvv: '111',
      holderName: 'Jane Doe'
 });
  });


  await test.step('Confirm payment and verify success message', async () => {
  await checkoutPage.confirmPayment();
  await checkoutPage.expectPaymentSuccess();
});

})