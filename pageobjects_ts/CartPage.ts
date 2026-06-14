// const { expect } = require('@playwright/test');
import { Locator, Page, expect } from "@playwright/test";

export class CartPage
{
    page : Page;
    cartProductText : Locator;
    cartCheckout : Locator;

    constructor(page:Page)
    {

        this.page=page;
        this.cartProductText=page.locator('h3:has-text("Zara Coat 3")');
        this.cartCheckout = page.locator("text=Checkout");
       
    }

async cartProductCheckOut(productName : string)
    {

        await expect(this.cartProductText).toBeVisible();
        await this.cartCheckout.click();
    
    }
    
}
// module.exports = {CartPage}