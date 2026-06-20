const {test,expect,request} = require('@playwright/test')

let fakepayLoad = {data: [],message: "No Orders"}
// let webContext;
// test.beforeAll( async({browser})=>
// {
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
//     await page.getByPlaceholder('email@example.com').fill("bhaskara4all@gmail.com");
//     await page.getByPlaceholder('enter your passsword').fill("Bhaskar@12345");
//     await page.getByRole('button',{name: 'Login'}).click();
//     await page.waitForLoadState("networkidle");
//     await context.storageState({path:'state1.json'});
//     webContext = await browser.newContext({storageState:'state1.json'});


// })

test.beforeEach(async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/dashboard/);

})

test.afterEach(async({page})=>
{
    await page.getByRole('button',{name: ' Sign Out '}).click();
})


 test.use({storageState:'state.json'})

test('Login with storageState', async({page,request})=>
{
    // const page = await webContext.newPage();

    

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>
        {
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakepayLoad);
            route.fulfill(
                {

                    response,
                    body,

                })  
            
        })

        await page.getByRole('button',{name: '  ORDERS'}).click();
        await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
        // await page.pause();
        await expect(page.getByText('You have No Orders to show at')).toBeVisible();

})

test('verify order',async({page})=>
{

    // await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    // await page.waitForLoadState("networkidle");
    // await expect(page).toHaveURL(/dashboard/);

    await page.getByRole('button',{name: '  ORDERS'}).click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        async route=>route.continue({url : "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=1234567890abcdef12345678"})
       
    )
    await page.getByRole('button',{name: 'View'}).first().click();
    // await page.pause();
    await expect(page.getByText('You are not authorize to view')).toBeVisible();

})