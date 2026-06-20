const {test, expect} = require('@playwright/test')

test('Login test',async({page})=>
{
    await test.step('Launch application', async()=>
    {
        await page.goto("https://eventhub.rahulshettyacademy.com/login");
    });

    await test.step('Login to application', async()=>
    {
        await page.getByPlaceholder('you@email.com').fill("bhaskara4all@gmail.com");
        await page.getByPlaceholder('••••••').fill("Bhaskar@123451");
        await page.getByRole('button',{name: 'Sign In'}).click();
        await expect(page.getByRole('link',{name: 'Browse Events →'})).toBeVisible();
    })
})