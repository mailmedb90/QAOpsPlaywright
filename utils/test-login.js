const base = require('@playwright/test')
const { LoginPage } = require('../pageobjects/LoginPage')

exports.logintest1 = base.test.extend(
{

    loginPage: async({page},use)=>
    {
       
        const loginPage = new LoginPage(page);
        use(loginPage);        

    }



})