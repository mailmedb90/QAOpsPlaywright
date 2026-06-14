const { expect } = require('@playwright/test');
class CartPage
{

    constructor(page,productName)
    {

        this.page=page;
        this.cartProductText=page.locator(`h3:has-text("${productName}")`);
        this.cartCheckout = page.locator("text=Checkout");
       
    }

async cartProductCheckOut(productName)
    {

        await expect(this.cartProductText).toBeVisible();
        await this.cartCheckout.click();
    
    }
    
}
module.exports = {CartPage}