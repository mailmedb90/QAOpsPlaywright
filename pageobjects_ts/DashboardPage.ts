import {Locator,Page} from '@playwright/test';

export class DashboardPage
{
    page : Page;
    products : Locator;
    productsText : Locator;
    cart : Locator;

    constructor(page : Page)
    {
        this.page=page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");


    }

    async searchProductAddCart(productName : string)
    {
        const productCard = this.page.locator('.card-body', { hasText: productName });
        const count = await productCard.count();
        if (count === 0) {
            throw new Error(`Product not found: ${productName}`);
        }
        await productCard.first().locator('text=Add To Cart').click();
    }

    async navigateToCart()
    {

        await this.cart.click();

    }


}
// module.exports = {DashboardPage}