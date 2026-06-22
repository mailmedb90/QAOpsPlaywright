const { test, expect } = require('@playwright/test');
const { GreenKartHomePage } = require('../pageobjects/GreeKartHomePage');
const { GreenKartCartPage } = require('../pageobjects/GreenKartCartPage');
const { POManager } = require('../pageobjects/POManager');
const { karttest } = require('../fixtures/kart-base');
const dataset = JSON.parse(JSON.stringify(require("../utils/GreenKartTestData.json")));

karttest(`GreenKart vegetable purchase ${dataset.productName}`, async ({ page, greenKartData }) => {

    const poManager = new POManager(page);
    const greenkartHomePage = poManager.getGreenKartHomePage();
    await greenkartHomePage.greeKartUrl();
    await greenkartHomePage.selectProduct(dataset.productName);
    await greenkartHomePage.verifyItems();

    const greenKartCartPage = poManager.getGreenKartCartPage();
    await greenKartCartPage.cart(dataset.productName);
    await greenKartCartPage.placeOrder(dataset.validPromoCode);
    await greenKartCartPage.countrySelectionandProceed(dataset.countryName);

})

karttest('Search product then add to cart', async ({ page, greenKartData }) => {

    const poManager = new POManager(page);
    const greenkartHomePage = poManager.getGreenKartHomePage();
    await greenkartHomePage.greeKartUrl();
    const greenKartCartPage = poManager.getGreenKartCartPage();
    await greenKartCartPage.verifyCartEmpty();
    await greenkartHomePage.searchProductandAddToCart(greenKartData.quantity, greenKartData.searchProdName);
    await greenKartCartPage.applyWrongPromoCode(greenKartData.quantity, greenKartData.invalidPromoCode);
    await greenKartCartPage.countrySelectionandProceed(greenKartData.diffCountryName);

})