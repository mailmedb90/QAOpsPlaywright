const base = require('@playwright/test')

exports.customtest = base.test.extend(
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