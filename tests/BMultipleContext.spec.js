const {test,expect} = require('@playwright/test')

test('Multiple context', async({browser})=>
{


        // This test demonstrates:

// Browser
// │
// ├── Context1 (User Session 1)
// │      ├── Page1 → EventHub Login
// │      └── Page2 → GreenKart
// │
// └── Context2 (User Session 2)
//        └── Page3 → Client App Login
// context1 and context2 have separate cookies, storage, and sessions.
// page1 and page2 share the same login/session because they belong to the same context.
// page3 is completely isolated because it belongs to a different context.

// This is commonly used for testing interactions between multiple users (Admin vs Customer, Buyer vs Seller, Chat users, etc.) in Playwright.

    const context1 = await browser.newContext();
    const context2 = await browser.newContext();

    const page1 = await context1.newPage();
    const page2 = await context1.newPage();

    const page3 = await context2.newPage();

     // Context 1 - Page 1
    await page1.goto("https://eventhub.rahulshettyacademy.com/login");
    await page1.waitForLoadState("networkidle");

    await page1.getByPlaceholder('you@email.com').fill("amar@yahoo.com");
    await page1.getByPlaceholder('••••••').fill("Amar@12345");
    await page1.getByRole('button',{name : 'Sign In'}).click();
    await expect(page1.getByRole('link',{name : 'Browse Events →'})).toBeVisible();

    // Context 1 - Page 2
    await page2.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page2.waitForLoadState("networkidle");


    // Context 2 - Page 3
    await page3.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await page3.waitForLoadState("networkidle");
    await page3.getByPlaceholder('email@example.com').fill("bhaskara4all@gmail.com");
    await page3.getByPlaceholder('enter your passsword').fill("Bhaskar@12345");

    
    await page3.getByRole('button',{name: 'Login'}).click();
    await expect(page3).toHaveURL(/dashboard/)

    await context1.close();
    await context2.close();


})