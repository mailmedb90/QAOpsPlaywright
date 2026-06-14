const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
// const playwright = require('@playwright/test');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions


    const products = this.page.locator(".card-body");
    await this.page.goto("https://rahulshettyacademy.com/client");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);

});

When('Add {string} to Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the Cart', async function (username) {
    // Write code here that turns the phrase above into concrete actions
    await this.page.locator("div li").first().waitFor();
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.cartProductCheckOut();
    const orderPage = this.poManager.getOrderPage();
    await orderPage.placeOrder(username);
});

// When('Enter valid details and Place the Order', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('Verify order is present in the OrderHistory', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {

    const userName = this.page.locator('input#username');
    const passWord = this.page.locator("[name='password']")
    const signin = this.page.locator('input#signInBtn')

    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());

    await userName.type(username);
    await passWord.type(password);
    await signin.click();
});

Then('Verify error message is displayed', async function () {

    console.log(await this.page.locator("[style*='block']").textContent());
    await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});