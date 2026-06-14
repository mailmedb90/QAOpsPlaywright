const { test, expect } = require('@playwright/test');
const {POManager} = require('../pageobjects/POManager.js');
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppPOTestData.json')))
const {customtest} = require('../utils/test-base.js')

for(const data of dataset)
{
   test(`Client App login ${data.productName}`, async ({ page }) => {
   
   const poManager = new POManager(page)

   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(data.username,data.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(data.productName);
   await dashboardPage.navigateToCart();
   await page.locator("div li").first().waitFor();
   const cartPage = poManager.getCartPage();
   await cartPage.cartProductCheckOut();
   const orderPage = poManager.getOrderPage();
   await orderPage.placeOrder(data.username);
   


   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);

   await page.locator("button[routerlink*='myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");


   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId.includes(rowOrderId)) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();

});

}


   customtest(`Client App login`, async ({ page,testDataForOrder }) => {
   
   const poManager = new POManager(page)

   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   
   const loginPage = poManager.getLoginPage();
   await loginPage.goTo();
   await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
   const dashboardPage = poManager.getDashboardPage();
   await dashboardPage.searchProductAddCart(testDataForOrder.productName);
   await dashboardPage.navigateToCart();
   await page.locator("div li").first().waitFor();
   const cartPage = poManager.getCartPage();
   await cartPage.cartProductCheckOut(testDataForOrder.productName);


   })




