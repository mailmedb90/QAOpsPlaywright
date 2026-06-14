const {test,expect,request} = require('playwright/test');
const {APiUtils} = require('../utils/APiUtils');

const loginPayLoad = {userEmail:"ruby321@gmail.com",userPassword:"Iamqueen@000"}
const orderPayLoad = {orders:[{country:"Cuba","productOrderedId":"6960eac0c941646b7a8b3e68"}]}

let response;

test.beforeAll( async()=>
{

    const apiContext = await request.newContext();
    const apiUtils = new APiUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad);
})
       
test('Place the order', async ({page})=>
{
    await page.addInitScript(value =>
    {
        window.localStorage.setItem('token',value);
    },response.token);
   

    const email = "ruby321@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');
    const cardTitles = page.locator(".card-body b");
    
    await page.goto('https://rahulshettyacademy.com/client');
 

    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    // const rowsCount = await rows.count();
    for(let i=0; i<await rows.count(); i++)
    {

        const roworderId = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;

        }

    }

     const orderIdDetails = await page.locator(".col-text").textContent();
     await page.pause();
     expect(response.orderId.includes(orderIdDetails)).toBeTruthy();



    // await page.pause();

});
