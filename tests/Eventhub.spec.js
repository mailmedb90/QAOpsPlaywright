const {test,expect} = require('@playwright/test');
const email = "bhaskara4all@gmail.com";
const password = "Bhaskar@12345";
const baseurl = "https://eventhub.rahulshettyacademy.com/"


async function login(page){

    
   await page.goto('${baseurl}/login');
   await page.getByPlaceholder('you@email.com').fill(email);
   await page.getByPlaceholder('••••••').fill(password);
   await page.getByRole('button', {name : 'Sign In'}).click();
   await expect(page.getByRole('link', { name: 'Browse Events →'})).toBeVisible();
   
}


test('Create event via UI, book it', async ({page}) =>
{
    await login(page);
    await page.goto('${baseurl}/admin/events');
    const eventTitle = 'Test Event ${Date.now()}';

    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.getByPlaceholder('Describe the event…').fill('Description added');
    await page.locator('#category').selectOption("Festival");
    await page.getByLabel('City').fill('Bengaluru');
    await page.getByLabel('Venue').fill('Church street 2nd cross');
    await page.locator('#event-date-&-time').fill('2026-05-22T23:34');

    await page.getByLabel('Price ($)').fill('100');
    await page.getByLabel('Total Seats').fill('50');

    await page.locator('#add-event-btn').click();

    await expect(page.getByText('Event created!')).toBeVisible();
    console.log('Created event: "${eventTitle}"');


    await page.goto('${baseurl}/events');
    const eventCards = page.getByTestId('event-card');
    await expect(eventCards.first()).toBeVisible();

    const targetCard = eventCards.filter({hasText : eventTitle }).first();
    await expect(targetCard).toBeVisible({tiemout : 5000});


    const seatsBeforeBooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log('Seats before booking: ${seatsBeforeBooking}');

    await page.getByTestId('book-now-btn').click();


});