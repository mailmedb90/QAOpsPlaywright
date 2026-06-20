const { test, expect } = require('@playwright/test');
const { GreenKartHomePage } = require('../pageobjects/GreeKartHomePage');
const { GreenKartCartPage } = require('../pageobjects/GreenKartCartPage');
const { POManager } = require('../pageobjects/POManager');
const {karttest} = require('../fixtures/kart-base');
const dataset = JSON.parse(JSON.stringify(require("../utils/GreenKartTestData.json")));

//   test.describe.configure({mode:'parallel'})
karttest(`GreenKart vegetable purchase ${dataset.productName}`, async ({ page,greenKartData }) => {

    const poManager = new POManager(page);
    const greenkartHomePage = poManager.getGreenKartHomePage();
    await greenkartHomePage.greeKartUrl();
    await greenkartHomePage.selectProduct(dataset.productName);
    await greenkartHomePage.verifyItems();

    const greenKartCartPage = poManager.getGreenKartCartPage();
    await greenKartCartPage.cart(dataset.productName);
    await greenKartCartPage.placeOrder(dataset.validPromoCode);
    await greenKartCartPage.countrySelectionandProceed(dataset.countryName);

    // const greenkartHomePage = new GreenKartHomePage(page);
    // await greenkartHomePage.greeKartUrl();
    // await greenkartHomePage.selectProduct("Cucumber - 1 Kg");
    // await greenkartHomePage.verifyItems();

    // const greenKartCartPage = new GreenKartCartPage(page);
    // await greenKartCartPage.cart("Cucumber - 1 Kg");
    // await greenKartCartPage.placeOrder("rahulshettyacademy");
    // await greenKartCartPage.countrySelectionandProceed("India");



    // const productName = "Cucumber - 1 Kg";

    // // const products = await page.locator('.products .product');
    // // const countProducts = await products.count();
    // // console.log(countProducts);

    // //    const prodNames = await products.allTextContents();
    // //    console.log(prodNames);

    // const productCard = await page.locator('.product').filter({ hasText: productName });
    // await productCard.getByRole('button', { name: 'ADD TO CART' }).click();

    // const cartItemCount = await page.getByRole('row', { name: 'Items :' }).getByRole('strong').textContent();
    // if (cartItemCount !== 0) {

    //     console.log("Item added to cart successfully");

    // }
    // await page.getByRole('link', { name: 'Cart' }).click();
    // await expect(page.locator('.cart-preview')).toContainText(productName)

    // await page.locator('.cart-preview').getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    // await page.getByPlaceholder('Enter promo code').fill("rahulshettyacademy");
    // await page.getByRole('button', { name: 'Apply' }).click();
    // await expect(page.locator('.promoInfo')).toBeVisible({ timeout: 10000 });
    // await expect(page.locator('.promoInfo')).toHaveText("Code applied ..!");
    // await page.getByRole('button', { name: 'Place Order' }).click();

    // await page.getByRole('combobox').selectOption("India");
    // await page.getByRole('checkbox').click();
    // await page.getByRole('button', { name: 'Proceed' }).click();

    // await expect(page.getByText('Thank you, your order has')).toBeVisible();

    // //  const expectedProd = await page.locator('.cart-item').locator('.product-name').filter({hasText: productName}).textContent();
    // // console.log(expectedProd);
    // // for(let i=0; i<countProducts;i++)
    // // {
    // //     const expectedProduct = await products.nth(i).locator('.product-name').textContent();
    // //     console.log(expectedProduct);
    // //     if(expectedProduct.trim() === productName )
    // //     {
    // //         await products.nth(i).getByRole('button',{name : 'ADD TO CART'}).click();
    // //         break;
    // //     }
    // // }

})

karttest('Search product then add to cart', async ({ page,greenKartData }) => {
    // const searchProdName = "Beetroot";
    // const quantity = "10";
    // const invalidPromoCode = "rahulshettyacademy1";

    const poManager = new POManager(page);
    const greenkartHomePage = poManager.getGreenKartHomePage();
    await greenkartHomePage.greeKartUrl();
    const greenKartCartPage = poManager.getGreenKartCartPage();
    await greenKartCartPage.verifyCartEmpty();
    await greenkartHomePage.searchProductandAddToCart(greenKartData.quantity,greenKartData.searchProdName);
    await greenKartCartPage.applyWrongPromoCode(greenKartData.quantity,greenKartData.invalidPromoCode);
    await greenKartCartPage.countrySelectionandProceed(greenKartData.diffCountryName);

    // const greenkartHomePage = new GreenKartHomePage(page);
    // await greenkartHomePage.greeKartUrl(); 
    // const greenKartCartPage = new GreenKartCartPage(page);
    // await greenKartCartPage.verifyCartEmpty();
    // await greenkartHomePage.searchProductandAddToCart(quantity,searchProdName);
    // await greenKartCartPage.applyWrongPromoCode(quantity,invalidPromoCode);
    // await greenKartCartPage.countrySelectionandProceed("Australia");


    // await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    // await page.waitForLoadState("networkidle");

    // await page.getByRole('link', { name: 'Cart' }).click();
    // await expect(page.locator('.cart-preview')).toContainText("You cart is empty!");

    // await page.getByPlaceholder('Search for Vegetables and Fruits').fill(searchProdName);
    // // await page.locator('.product .product-name').first().waitFor();
    // const searchedProduct = page.locator('.product').filter({hasText: searchProdName});
    // await expect(searchedProduct).toBeVisible();
    // // await expect(page.locator('.product .product-name')).first().toContainText(searchProdName);


    // await searchedProduct.getByRole('spinbutton').clear();
    // await searchedProduct.getByRole('spinbutton').fill(quantity);

    // await page.getByRole('button', { name: 'ADD TO CART' }).first().dblclick();
    // await page.getByRole('link', { name: 'Cart' }).click();
    // await expect(page.locator('.product-total .quantity').first()).toContainText(quantity);
    // // await expect(page.locator('.cart-preview')).toContainText(quantity);
    // // await expect(page.getByRole('listitem').getByText('Nos.')).toContainText(quantity);

    // await page.locator('.cart-preview').getByRole('button', { name: 'PROCEED TO CHECKOUT' }).click();
    // await page.getByPlaceholder('Enter promo code').fill("rahulshettyacademy1");
    // await page.getByRole('button', { name: 'Apply' }).click();
    // await expect(page.locator('.promoInfo')).toBeVisible({ timeout: 15000 });
    // await expect(page.locator('.promoInfo')).toHaveText("Invalid code ..!");
    // await page.getByRole('button', { name: 'Place Order' }).click();
    // await page.getByRole('combobox').selectOption("Australia");
    // await page.getByRole('checkbox').click();
    // await page.getByRole('button', { name: 'Proceed' }).click();

    // await expect(page.getByText('Thank you, your order has')).toBeVisible();

})