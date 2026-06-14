const { expect } = require('@playwright/test')
const { logintest } = require('../utils/test-loginbase.js')
const{logintest1} = require('../utils/test-login.js')

logintest('login test', async({page, loggedInPage})=>
{

    await expect(loggedInPage).toHaveURL(/angularpractice/);


})

logintest1.only('Login test check', async({loginPage})=>
{

    await loginPage.goTo();
    await loginPage.validLogin('anshika@gmail.com','Iamking@000')

})