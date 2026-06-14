
import {LoginPage} from './LoginPage';
import {DashboardPage} from './DashboardPage';
import {CartPage} from './CartPage';
import {OrderPage} from './OrderPage';
import { Page } from '@playwright/test';


export class POManager
{

    loginPage : LoginPage;
    dashboardPage : DashboardPage;
    cartPage : CartPage;
    orderPage : OrderPage;
    page : Page;



    constructor(page : Page)
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
// module.exports = {POManager};