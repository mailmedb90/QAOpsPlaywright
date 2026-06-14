const loginbase = require('@playwright/test')

exports.logintest = loginbase.test.extend(
{

    loggedInPage: async({page},use)=>
    {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        await page.fill('#username', "rahulshettyacademy");
        await page.fill('#password', "Learning@830$3mK2");
        await page.click('#signInBtn');

        await use(page);
        

    }



})