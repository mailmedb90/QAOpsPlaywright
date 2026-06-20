const { test, request, expect } = require('@playwright/test')

let token;
const payload = { userEmail: "bhaskara4all@gmail.com", userPassword: "Bhaskar@12345" }


test.beforeAll(async ({ request }) => {

    const response = await request.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: payload
            // {
            //     userEmail : "bhaskara4all@gmail.com",
            //     userPassword : "Bhaskar@12345"
            // }
        })
    await expect(response.ok()).toBeTruthy();
    // console.log(response.status());
    // console.log(await response.text());
    const responseJson = await response.json();
    token = responseJson.token;
    console.log(token);

})

test('Login with token', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    await expect(page).toHaveURL(/dashboard/);

})