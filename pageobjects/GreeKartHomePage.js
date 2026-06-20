const { test, expect } = require('@playwright/test');
class GreenKartHomePage {

    constructor(page) {

        this.page = page;
        this.productVegCard = page.locator('.product');
        this.cartItem = page.getByRole('row', { name: 'Items :' }).getByRole('strong');
        this.searchFruitsandVeg = page.getByPlaceholder('Search for Vegetables and Fruits');
        this.addToCart = page.getByRole('button', { name: 'ADD TO CART' });

    }

    async greeKartUrl() {

        await this.page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
        await this.page.waitForLoadState("networkidle");

    }

    async selectProduct(productName) {

        const productCard = await this.productVegCard.filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'ADD TO CART' }).click();

    }

    async verifyItems() {

        const cartItemCount = await this.cartItem.textContent();
        if (cartItemCount !== 0) {

            console.log("Item added to cart successfully");

        }

    }

    async searchProductandAddToCart(quantity,searchProdName) {
        await this.searchFruitsandVeg.fill(searchProdName);
        // await page.locator('.product .product-name').first().waitFor();
        const searchedProduct = this.productVegCard.filter({ hasText: searchProdName });
        await expect(searchedProduct).toBeVisible();
        // await expect(page.locator('.product .product-name')).first().toContainText(searchProdName);
        await searchedProduct.getByRole('spinbutton').clear();
        await searchedProduct.getByRole('spinbutton').fill(quantity);

        await this.addToCart.first().dblclick();

    }

}
module.exports = { GreenKartHomePage };


