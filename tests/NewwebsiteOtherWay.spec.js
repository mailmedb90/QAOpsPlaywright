const {test,expect} = require('@playwright/test');


test('Client App Login', async ({page})=>
{
    const email = "ruby321@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');
    const cardTitles = page.locator(".card-body b");
    
    await page.goto('https://rahulshettyacademy.com/client');
  
    await page.getByPlaceholder('email@example.com').type(email);
    await page.getByPlaceholder('enter your passsword').type("Iamqueen@000");
    await page.getByRole('button',{name:'Login'}).click();
    
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    await page.locator('.card-body').filter({hasText: 'ZARA COAT 3'}).getByRole('button',{name: "Add to Cart"}).click();


    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();

    await page.locator("div li").first().waitFor();

    await expect (page.getByText('ZARA COAT 3')).toBeVisible();

    await page.getByRole('button',{name:"Checkout"}).click();
    await page.getByPlaceholder('Select Country').pressSequentially("ind");
    await page.getByRole('button',{name:"India"}).nth(1).click();
    await page.getByText('PLACE ORDER').click();

    await expect (page.getByText('Thankyou for the order.')).toBeVisible();
    const orderNumber = await page.locator('label.ng-star-inserted').textContent();
    
    const orderNumbertrimed = orderNumber.replace(/\|/g, '').trim();
    console.log(orderNumbertrimed);

    await page.getByRole("listitem").getByRole('button', {name:"ORDERS"}).click();
    await page.locator("tbody tr").first().waitFor();

    const ordersList = page.locator("tbody tr").filter({hasText: orderNumbertrimed});

    await ordersList.getByRole('button', { name: 'View' }).click();
    
    

});
