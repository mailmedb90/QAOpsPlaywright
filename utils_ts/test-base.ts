// const base = require('@playwright/test')
import {test as baseTest}  from '@playwright/test';

interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;

};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{

    testDataForOrder:
    {
        username : "ruby321@gmail.com",
        password : "Iamqueen@000",
        productName : "ADIDAS ORIGINAL"

    }


})
    // username : "anshika@gmail.com",
    // password : "Iamking@000",
    // productName : "ZARA COAT 3"

    // username : "ruby321@gmail.com",
    //     password : "Iamqueen@000",
    //     productName : "ADIDAS ORIGINAL"