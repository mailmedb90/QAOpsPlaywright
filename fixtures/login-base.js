const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        
            loginData:{
                username: "bhaskara4all@gmail.com",
                password: "Bhaskar@12345"

            },

            productData:{
                productName: "ZARA COAT 3"

            },

            userData:{
                firstName: "Bhaskara",
                lastName: "D"

            }        

    });