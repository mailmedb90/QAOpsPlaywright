const { test } = require('@playwright/test');
const { LoginPractisePage } = require('../pageobjects/LoginPractisePage.js');
const { ShopPage } = require('../pageobjects/ShopPage.js');

test('login and verify iphone X on shop page', async ({ page }) => {
    const loginPage = new LoginPractisePage(page);
    const shopPage = new ShopPage(page);

    await loginPage.goTo();
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
    await shopPage.verifyProductPresent('iphone X');
});