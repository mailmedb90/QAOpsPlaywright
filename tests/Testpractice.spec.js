const {test,expect} = require('@playwright/test');
const { parseEnv } = require('node:util');

test.skip('Get dynamic table content',async({page})=>
{

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page.getByPlaceholder('email@example.com').fill("ruby321@gmail.com");
    await page.getByPlaceholder('enter your passsword').fill("Iamqueen@000");
    await page.getByRole('button',{name: 'Login'}).click();
    await page.waitForLoadState('networkidle');

    const products = await page.locator('.card-body');

    await products.first().waitFor();

    const count = await products.count();
    for(let i=0;i<count;i++)
    {
        const productName = await products.nth(i).locator('b').textContent();
        if(productName==="ZARA COAT 3")
        {
            await products.nth(i).getByRole('button',{name: ' Add To Cart'}).click();
            break;
        }
    }



    // const titles = await page.locator('.card-body b').allTextContents();
    // console.log(titles);

    // const prices = await page.locator('.card-body .text-muted').allTextContents();
    // console.log(prices);



    // await page.getByText('ZARA COAT 3').getByRole('button',{name: ' Add To Cart'}).click()
    // await page.getByRole('button',{name: '  Cart '}).click();
    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();


})

test.skip('Get dynamic product table content',async({page})=>
{


    await page.goto("https://www.amazon.in/");
    // await page.waitForLoadState('networkidle');
    await page.getByText('Refrigerators').waitFor();
    await page.getByText('Refrigerators').click();
    await page.locator('.s-line-clamp-4').first().waitFor();
    const productsAmz = await page.locator('[role="listitem"]');
    const countAmz = await productsAmz.count();
    console.log(countAmz);
    for(let i=0;i<countAmz;i++){

        const productNameAmz = await productsAmz.nth(i).locator('h2 span').textContent();
        // console.log(productNameAmz);
        if(productNameAmz.includes("LG 655 L")){
            // console.log(await productsAmz.nth(i).innerHTML());
            await productsAmz.nth(i).getByRole('button', {name: 'Add to cart'}).click();
            break;
        }

    }
    await page.getByRole('link', { name: 'item in cart' }).click();
    await page.locator('div li').first().waitFor();
    await page.locator('h3 .a-truncate-cut').first().waitFor();
    const productTitle = await page.getByRole('link', { name: 'LG 655 L, 3 Star, Frost-Free Smart Inverter Double Door Side-By-Side Refrigerator (GL-B257HDSY, Dazzle Steel, Smart Diagnosis, Express Freeze | Multi Air-Flow)', exact: true }).textContent();
    console.log(productTitle);
    await expect(productTitle).toContain("LG 655 L, 3 Star, Frost-Free Smart Inverter Double Door Side-By-Side Refrigerator");  


    await page.evaluate(() => {
    window.scrollTo(0, 500);
});
    const signInBtn = page.getByRole('button', { name: 'Sign in' });



    const page1Promise = page.waitForEvent('popup');
    
    await page.getByRole('link', { name: 'LG 655 L, 3 Star, Frost-Free Smart Inverter Double Door Side-By-Side Refrigerator (GL-B257HDSY, Dazzle Steel, Smart Diagnosis, Express Freeze | Multi Air-Flow)', exact: true }).click();
    const page1 = await page1Promise;
    // await page1.waitForLoadState('networkidle');
    await page1.getByRole('heading', { name: 'LG 655 L, 3 Star, Frost-Free Smart Inverter Double Door Side-By-Side Refrigerator' }).first().waitFor();
    const headingTitle = await page1.getByRole('heading', { name: 'LG 655 L, 3 Star, Frost-Free Smart Inverter Double Door Side-By-Side Refrigerator' });
    await expect(headingTitle).toBeVisible();



})


test.skip('how to handle iFrame', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();



    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


    // await page.locator('radioButton').nth(0).click();
   // await page.locator('label').filter({ hasText: 'Radio1' }).getByRole('radio').check();

    // await page.getByRole('radio',{name: 'Radio1'}).check();

    //How to handle table

    // const tableContent = await page.locator('#product tr').allTextContents();
    // console.log(tableContent);
    // const tableCount = await tableContent.count();

    const rows = page.locator('table tbody tr');
    console.log(rows.count());


    //How to handle pop-up
    page.on('dialog',dialog => dialog.accept());
    await page.locator('#alertbtn').click();


    //How to handle radio button
    await expect(page.locator('.radioButton').first()).not.toBeChecked();
    await page.locator('.radioButton').first().check();
    await expect(page.locator('.radioButton').first()).toBeChecked();

    // await page.locator('.radioButton').first().check();

   
    //How to handle check box
    await expect(page.getByText('Option1').getByRole('checkbox')).not.toBeChecked();
    await page.getByText('Option1').getByRole('checkbox').click();
    await expect(page.getByText('Option1').getByRole('checkbox')).toBeChecked();


    //Suggestion combo box
    await page.getByPlaceholder('Type to Select Countries').pressSequentially("Ind");
    const dropdown = await page.locator('#ui-id-1');
    await dropdown.waitFor();
    const optionCount = await dropdown.locator('.ui-menu-item').count();
    console.log(optionCount);

    for(let i=0;i<optionCount;i++)
    {

        const countryName = await dropdown.locator('.ui-menu-item').nth(i).textContent();
        if(countryName==="India")
        {

            await dropdown.locator('.ui-menu-item').nth(i).click();
            break;

        }

    }


    // How to handle dropdown
    await page.locator('#dropdown-class-example').selectOption('Option2');


    //How to handle child tab
    const opentab = await page.getByRole('link',{name: 'Open Tab'});

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        opentab.click(),

    ])
    await newPage.waitForLoadState();
    await expect(newPage.getByText("qaclickacademy.com")).toBeVisible();


    //How to handle child window

    const childWindow = await page.locator('#openwindow')

    const [newWindow] = await Promise.all([
        context.waitForEvent('page'),
        childWindow.click(),

    ])

    await newWindow.waitForLoadState();
    await expect(newWindow.getByText("qaclickacademy.com")).toBeVisible();

    // console.log(domain);
    // await expect(domain).toHaveText("qaclickacademy.com");

   

    // await expect(page.locator('#displayed-text')).toBeVisible();
    // await page.locator('#hide-textbox').click();
    // await expect(page.locator('#displayed-text')).toBeHidden();

    // const mouseHover = await page.locator('#mousehover');
    // await mouseHover.hover();
    // await page.getByRole('link',{name: 'Reload'}).click();


    // const frames = page.frames();
    // for(const frame of frames){
    //     console.log(frame.name());
    //     console.log(frame.url());

    // }

    // const framePage = await page.frameLocator('#courses-iframe');

    // await framePage.getByRole('link',{name: 'All Access plan'}).click();
    // const subscribers = await framePage.locator('.text h2').textContent();
    // const subCount = subscribers.split(" ")[1];
    // console.log(subCount);

    // const paymentFrame = await page.frameLocator


})

test.skip('how to handle table', async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();



    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


  
    const rows = page.locator('.table-display tbody tr');
    const rowCount = await rows.count();
    console.log(rowCount);

    for(let i=0; i<rowCount; i++){

        const rowText = await rows.nth(i).textContent();
        console.log(rowText);


    }


})

test.skip('how to handle table1', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const rows = page.locator('.table-display tbody tr');

for(let i = 0; i < await rows.count(); i++) {

    const cells = rows.nth(i).locator('td').nth(i).textContent();

    console.log(
        await cells.allTextContents()
    );
}
    

});

test('how to handle table2', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const rows = page.locator('#product').last();

for(let i = 0; i < await rows.count(); i++) {

    const cells = rows.nth(i).locator('td');

    console.log(
        await cells.allTextContents()
        // page.getByRole('')
    );
}
    

});
