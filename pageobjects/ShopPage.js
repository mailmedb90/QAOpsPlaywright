const { expect } = require('@playwright/test');

class ShopPage {
    constructor(page) {
        this.page = page;
    }

    async verifyProductPresent(productName) {
        const productTitle = this.page.locator(`h4:has-text("${productName}")`);
        await expect(productTitle).toBeVisible();
    }
}

module.exports = { ShopPage };