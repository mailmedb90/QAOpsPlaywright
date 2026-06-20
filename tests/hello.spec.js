//Author : Bhaskar
const { test, expect } = require('@playwright/test');
const { OrderHistoryPage } = require('../pageobjects/OrderHistoryPage.js');
const dataset = JSON.parse(JSON.stringify(require('../utils/ClientAppPOTestData.json')));

test('make HTTP GET call with Playwright request', async ({ request, page }) => {
    const orderHistoryPage = new OrderHistoryPage(page);
    
    const response = await request.get('https://jsonplaceholder.typicode.com/posts/1');
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id', 1);
    expect(body).toHaveProperty('title');

    console.log('GET response body:', body);
});