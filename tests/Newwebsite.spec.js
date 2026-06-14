const {test,expect} = require('@playwright/test');


test('New website Playwright test', async ({browser})=>
{
    const context =await browser.newContext();
    const page =await context.newPage();
    const cardTitles = page.locator(".card-body b");
    
    await page.goto('https://rahulshettyacademy.com/client');
    await page.locator('#userEmail').type("bhaskara4all@gmail.com");
    await page.locator('#userPassword').type("Learning@830$3mK2");
    await page.locator("[type='submit']").click();
    await page.locator(".card-body b").first().waitFor();
    const cards = (await cardTitles.allTextContents());
    console.log(cards);
   

});

test('Client App Login', async ({page})=>
{
    const email = "anshika@gmail.com";
    const productName = "ZARA COAT 3";
    const products = page.locator('.card-body');
    const cardTitles = page.locator(".card-body b");
    
    await page.goto('https://rahulshettyacademy.com/client');
  
    await page.locator('#userEmail').type(email);
    await page.locator('#userPassword').type("Iamking@000");
    await page.locator("[type='submit']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = (await cardTitles.allTextContents());
    //console.log(titles);
    const count = await products.count();
  for(let i=0; i<count; i++)
  {

    if (await products.nth(i).locator("b").textContent() == productName)
    {

        await products.nth(i).locator("text= Add To Cart").click();
        break;
    }

  }

    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind",{delay : 150});

    const dropdown = await page.locator('.ta-results');
    await dropdown.waitFor();
    const optionCount = await dropdown.locator('button').count();
    for (let i=0; i<optionCount; i++)
    {

        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India")
        {
            await dropdown.locator('button').nth(i).click()
            break;
        }
        
    }


    const datemonthdropdown = await page.locator('select.input');
    // const documentLink = await page.locator("[href*='documents-request']");
    await datemonthdropdown.first().selectOption('02');
    await datemonthdropdown.last().selectOption('10');

    await page.locator('input.input').nth("1").fill("123");
    await page.locator('input.input').nth("2").fill("anshika");
    await page.locator('input.input').nth("3").fill("rahulshettyacademy");
    await page.locator('[type="submit"]').click();
    await expect ( page.locator(".ng-touched p")).toHaveText("* Coupon Applied");

    expect (await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator(".action__submit").click();
    expect (await page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
    // const orderId =await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    const orderId =await page.locator("label.ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='/myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    // const rowsCount = await rows.count();
    for(let i=0; i<await rows.count(); i++)
    {

        const roworderId = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(roworderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;

        }

    }

     const orderIdDetails = await page.locator(".col-text").textContent();
     expect(orderId.includes(orderIdDetails)).toBeTruthy();



    // await page.pause();

});
