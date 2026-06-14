const { test, expect } = require('@playwright/test')


test('Security test request intercept', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill('ruby321@gmail.com');
    await page.getByPlaceholder('enter your passsword').fill('Iamqueen@000');
    await page.getByRole('button', { name: 'Login' }).click()
    await page.waitForLoadState("networkidle");
    // await page.locator("button[routerlink*='/myorders']").click();
    await page.getByRole('button', { name: '  ORDERS' }).click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
     async   route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=9f4d82c7ab31e6f58d72a149' })

    )
    
    //  await page.pause();
    await page.getByRole('button', { name: 'View' }).first().click();
    await expect(page.locator('.blink_me')).toHaveText('You are not authorize to view this order');

  

})