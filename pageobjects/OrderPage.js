const { expect } = require('@playwright/test');
class OrderPage
{

    constructor(page)
    {
        this.page = page;
        this.selectCountry = page.locator("[placeholder*='Country']");
        this.countryDropdown = page.locator(".ta-results");
        this.placeOrderbutton = page.locator(".action__submit");

    }

    async placeOrder(username)
    {

        expect(this.page.locator(".user__name [type='text']").first()).toHaveText(username);
        await this.placeOrderbutton.click();
         await this.selectCountry.pressSequentially("ind");
           const dropdown = this.countryDropdown;
           await dropdown.waitFor();
           const optionsCount = await dropdown.locator("button").count();
           for (let i = 0; i < optionsCount; ++i) {
              const text = await dropdown.locator("button").nth(i).textContent();
              if (text === " India") {
                 await dropdown.locator("button").nth(i).click();
                 break;
              }
           }
        //    console.log(username);
           await expect(this.page.getByText('ruby321@gmail.com')).toBeVisible();
        //    await expect(this.page.locator(".user__name [type='text']").first()).toContainText(username);
           await this.placeOrderbutton.click();

    }


}
module.exports = {OrderPage};