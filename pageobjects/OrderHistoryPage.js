class OrderHistoryPage
{

    constructor(page,orderId)
    {
        this.page = page;
        this.orderId = orderId;
        this.rowTable = page.locator("tbody tr");
        this.orderIdDetailsPage = page.locator(".col-text")

    }

    async orderHistoryVerification(orderId)
    {

           const rows = await this.rowTable;
           await this.rowTable.first().waitFor();
           for (let i = 0; i < await rows.count(); ++i) {
              const rowOrderId = await rows.nth(i).locator("th").textContent();
              if (orderId.includes(rowOrderId)) {
                 await rows.nth(i).locator("button").first().click();
                 break;
              }
           }

    }

    async orderDetails(orderId)
    {

        const orderIdDetails = await this.orderIdDetailsPage.textContent();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();

    }



}
module.exports = {OrderHistoryPage};