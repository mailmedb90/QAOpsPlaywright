const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {CartPage} = require('./CartPage');
const {OrderPage} = require('./OrderPage');

class POManager
{
    constructor(page)
    {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page)
        this.cartPage = new CartPage(this.page);
        this.orderPage = new OrderPage(this.page);

    }


    getLoginPage()
    {
        return this.loginPage;
    }


    getDashboardPage()
    {
        return this.dashboardPage;
    }

    getCartPage()
    {
        return this.cartPage;
    }

    getOrderPage()
    {
        return this.orderPage;
    }

}
module.exports = {POManager};