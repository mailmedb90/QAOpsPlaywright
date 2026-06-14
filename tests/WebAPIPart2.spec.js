const { test, expect, request } = require('@playwright/test')
let webContext;
let fakeOrderPayload = { data: [], message: "No Orders" }
                        
test.beforeAll(async ({ browser }) => {
    const apiRequest = await request.newContext();
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.locator('#userEmail').fill('ruby321@gmail.com');
    await page.locator('#userPassword').fill('Iamqueen@000')
    await page.getByRole('button', { name: 'Login' }).click();
    await page.waitForLoadState("networkidle");

    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });


})

test('New test', async () => {

    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route => {

            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeOrderPayload);
            route.fulfill
                (
                    {

                        response,
                        body,

                    });
        });

    await page.locator("button[routerlink*='/myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");

    console.log(await page.locator('.mt-4').textContent());


})