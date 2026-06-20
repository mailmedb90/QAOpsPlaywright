const base = require('@playwright/test')

exports.karttest = base.test.extend(
    {

        greenKartData:
        {
            productName: "Cucumber - 1 Kg",
            validPromoCode: "rahulshettyacademy",
            invalidPromoCode: "rahulshettyacademy1",
            quantity: "10",
            searchProdName: "Beetroot",
            countryName: "India",
            diffCountryName: "Australia",

        }

    })
