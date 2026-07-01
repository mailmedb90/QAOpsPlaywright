const {test, expect} = require('@playwright/test')

test('Login test',async({page})=>
{
    await test.step('Launch application', async()=>
    {
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
    });

    await test.step('Login to application', async()=>
    {

        const usename = process.env.APP_USERNAME;
        const password = process.env.APP_PASSWORD;
        console.log("Username:", process.env.APP_USERNAME);
        console.log("Password exists:", !!process.env.APP_PASSWORD);

        await page.getByPlaceholder('you@email.com').fill(usename);
        await page.getByPlaceholder('••••••').fill(password);
        await page.getByRole('button',{name: 'Sign In'}).click();
        await expect(page.getByRole('link',{name: 'Browse Events →'})).toBeVisible();
    })
})