const {test,expect} = require ('@playwright/test')


// test.describe.configure({mode:'serial'})
test.only ('Popup Validation', async ({page}) =>
{
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.pause();
    page.on('dialog', dialog => dialog.accept());
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();
  
    
    //for dynamical loaded frames use below code to identify the frame name and url

    // const frames = page.frames();
    // for(const frame of frames){
    //     console.log(frame.name());
    //     console.log(frame.url());

    // }
    // await page.keyboard.press('PageDown');

    // const restAPICourse = await page.getByRole('link',{name: 'REST API'});
    // await restAPICourse.scrollIntoViewIfNeeded();
    // await expect(restAPICourse).toBeVisible();
    // await restAPICourse.click();


    const framePage = await page.frameLocator('#courses-iframe');
    // await framePage.locator("li a[href*='lifetime-access']:Visible").click();
    await framePage.getByRole('link',{name: 'All Access plan'}).click()
    const textCheck = await framePage.locator('.text h2').textContent();
    console.log (textCheck.split(" ")[1]);

})

test ('@UI Screenshot Validation', async ({page}) =>
{
  
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("http://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#displayed-text').screenshot({path: 'elementscreenshot.jpg'});
    await page.locator('.tableFixHead').screenshot({path: 'table.jpeg'});
    await page.locator("[name='courses']").screenshot({path: 'webtable.jpg'})
    await page.locator('#hide-textbox').click();
    await page.screenshot({path: 'screenshot.png'});
    await expect(page.locator('#displayed-text')).toBeHidden();
    


})

test ('@smoke Visual Validation', async ({page}) =>
{
  
    await page.goto("https://google.com/");
    // expect(await page.screenshot()).toMatchSnapshot('test.png');
    
    await expect(page).toHaveScreenshot('test1.png');


})