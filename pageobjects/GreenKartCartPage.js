const { test, expect } = require('@playwright/test');
class GreenKartCartPage {

    constructor(page) {

        this.page = page;
        this.cartButton = page.getByRole('link', { name: 'Cart' });
        this.cartPreview = page.locator('.cart-preview');
        this.checkout = page.locator('.cart-preview').getByRole('button', { name: 'PROCEED TO CHECKOUT' });
        this.promoCodeTextBox = page.getByPlaceholder('Enter promo code');
        this.applyButton = page.getByRole('button', { name: 'Apply' });
        this.promoInfo = page.locator('.promoInfo');
        this.placeOrderbutton = page.getByRole('button', { name: 'Place Order' });
        this.country = page.getByRole('combobox');
        this.agreeTermsCheckbox = page.getByRole('checkbox');
        this.proceedButton = page.getByRole('button', { name: 'Proceed' });
        this.validationText = page.getByText('Thank you, your order has');
        this.cartQuantity = page.locator('.product-total .quantity');
    }


    async cart(productName) {
        await this.cartButton.click();
        await expect(this.cartPreview).toContainText(productName)
        await this.checkout.click();
    }

    async placeOrder(validPromoCode) {
        await this.promoCodeTextBox.fill(validPromoCode);
        await this.applyButton.click();
        await expect(this.promoInfo).toBeVisible({ timeout: 10000 });
        await expect(this.promoInfo).toHaveText("Code applied ..!");
        await this.placeOrderbutton.click();
    }

    async countrySelectionandProceed(countryName) {

        await this.country.selectOption(countryName);
        await this.agreeTermsCheckbox.click();
        await this.proceedButton.click();

        await expect(this.validationText).toBeVisible();

    }

    async verifyCartEmpty() {
        await this.cartButton.click();
        await expect(this.cartPreview).toContainText("You cart is empty!");

    }

    async applyWrongPromoCode(quantity,invalidPromoCode) {
        await this.cartButton.click();
        await this.cartQuantity.first().waitFor();
        await expect(this.cartQuantity.first()).toContainText(quantity);
        // await expect(page.locator('.cart-preview')).toContainText(quantity);
        // await expect(page.getByRole('listitem').getByText('Nos.')).toContainText(quantity);

        await this.checkout.click();
        await this.promoCodeTextBox.fill(invalidPromoCode);
        await this.applyButton.click();
        await expect(this.promoInfo).toBeVisible({ timeout: 15000 });
        await expect(this.promoInfo).toHaveText("Invalid code ..!");
        await this.placeOrderbutton.click();
    }

}

module.exports = { GreenKartCartPage };








