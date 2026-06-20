const {LoginPage} = require('./LoginPage');
const {DashboardPage} = require('./DashboardPage');
const {OrdersHistoryPage} = require('./OrdersHistoryPage');
const {OrdersReviewPage} = require('./OrdersReviewPage');
const {CartPage} = require('./CartPage');
const {GreenKartHomePage} = require('./GreeKartHomePage');
const {GreenKartCartPage} = require('./GreenKartCartPage');


class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.ordersHistoryPage = new OrdersHistoryPage(this.page);
    this.ordersReviewPage = new OrdersReviewPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.greenkartHomePage = new GreenKartHomePage(this.page);
    this.greenKartCartPage = new GreenKartCartPage(this.page);

}

getLoginPage()
{
    return this.loginPage;
}

getCartPage()
{
    return this.cartPage;
}

getDashboardPage()
{
    return this.dashboardPage;
}
getOrdersHistoryPage()
{
    return this.ordersHistoryPage;
}

getOrdersReviewPage()
{
    return this.ordersReviewPage;
}

getGreenKartHomePage()
{
    return this.greenkartHomePage;
}

getGreenKartCartPage()
{
    return this.greenKartCartPage;
}


}
module.exports = {POManager};