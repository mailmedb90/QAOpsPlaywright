const { expect } = require('@playwright/test');
class ThankyouPage
{
    constructor(page,orderId)
    {
        this.page = page;
        this.orderId=orderId;
        this.thankyoumessage = page.locator(".hero-primary");
        this.orderIdContent = page.locator(".em-spacer-1 .ng-star-inserted");
        this.orders = page.locator("button[routerlink*='myorders']")
    }

    async thanksMessageVerification(orderId)
    {
        await expect(this.thankyoumessage).toHaveText(" Thankyou for the order. ");
        // const orderId = await this.orderIdContent.textContent();
        // console.log(orderId);

    }

    async navigateToOrders()
    {

        await this.orders.click();
        await this.page.locator("tbody").waitFor();

    }

}
module.exports = {ThankyouPage};