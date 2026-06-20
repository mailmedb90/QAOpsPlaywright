const { test, expect } = require('@playwright/test')

test('Multiple tabs handeling', async ({ browser, page }) => {

    const context = await browser.newContext();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.waitForLoadState("networkidle");

    const [newPage] = await Promise.all([
        page.context().waitForEvent('page'),
        page.getByText('Free Access to InterviewQues/ResumeAssistance/Material').click()
    ]);

    await newPage.waitForLoadState("networkidle");
    const readText = await newPage.locator('.red').textContent();
    console.log(readText);

    let domain = readText.split("@")[1].split(" ")[0];
    console.log(domain);

    await page.locator('#username').fill(domain);
    await expect(page.getByRole('textbox', { name: 'username' })).toHaveValue(domain);

})