const {test,expect} = require('@playwright/test');
const { TIMEOUT } = require('node:dns');


test('First Playwright test', async ({browser})=>
{
    const context =await browser.newContext();
    const page =await context.newPage();

    //  page.route('**/*.{jpg,png,jpeg}', route=> route.abort());

    //  page.on('request',request=>console.log(request.url()));
    //  page.on('response',response=>console.log(response.url(),response.status()));

    const userName = page.locator('input#username');
    const password = page.locator("[name='password']")
    const signin = page.locator('input#signInBtn')
    const cardTitles = page.locator(".card-title a");
    const cardPrices = page.locator('.card-body h5'); 


   await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
   console.log(await page.title());

   await userName.type("rahulshetty");
   await password.type("learning");
   await signin.click();
   console.log(await page.locator("[style*='block']").textContent());
   await expect(page.locator("[style*='block']")).toContainText('Incorrect'); 

 await userName.fill("");
 await password.fill("");
 await userName.type("rahulshettyacademy");
 await password.type("Learning@830$3mK2");
 await signin.click();

 //console.log (await cardTitles.nth(1).inputValue());
 //console.log (await cardTitles.first().inputValue());
  await cardTitles.first().waitFor();
   const allTitles = await cardTitles.allTextContents();
   const allPrices = await cardPrices.allTextContents();
   console.log(allTitles);
   console.log(allPrices);

});


test('@UI UI Controls', async ({page})=>
{
     await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const dropdown = await page.locator('select.form-control');
    await dropdown.selectOption('Teacher');

    const documentLink = await page.locator("[href*='documents-request']");
  
    await page.locator('#terms').click();
    await expect(page.locator('#terms')).toBeChecked();
  
    await page.locator('#terms').uncheck();
    await expect(page.locator('#terms')).not.toBeChecked();

    await page.locator('.radiotextsty').nth(1).click();
    console.log (await page.locator('.radiotextsty').nth(1).isChecked());
    await expect(page.locator('.radiotextsty').nth(1)).toBeChecked();

    await expect(documentLink).toHaveAttribute('class','blinkingText');
    await page.locator('#okayBtn').click();

    // await page.pause();
    });


    test('@smoke Child windows handle', async ({browser})=>
    {
    const context =await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const documentLink = await page.locator("[href*='documents-request']");

   const [newPage,newPage2] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click(),
   ])
   
    const newPageText =await newPage.locator('.red').textContent();
   console.log(newPageText);
   const arrayText = newPageText.split("@");
   const domain = await arrayText[1].split(' ')[0];
    console.log(domain);

    

    await page.locator('#username').type(domain);
    console.log(await page.locator('#username').inputValue());
    // await page.pause();

})

test.only('child window handle', async({browser})=>
{

    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const docLink = await page.getByRole('link',{name: 'Free Access to InterviewQues/ResumeAssistance/Material'});

    const [newPage,newPage1,newPage2] = await Promise.all([
    context.waitForEvent('page'),
    docLink.click(),

    ])

    const newText = await newPage.locator('.red').textContent();
    const arrayText = newText.split('@')[1];
    const domain = arrayText.split(' ')[0];
    console.log(domain);
    await page.locator('#username').fill(domain);
    console.log(await page.locator('#username').inputValue());

    await newPage1.locator('');
    await newPage2.locator('');



})