const {test,expect} = require ('@playwright/test');
const { timeout } = require('../playwright.config');

test('Eventhub login', async({page})=>
{
    const email = 'bhaskara4all@gmail.com';
    const password = 'Bhaskar@12345';
    const eventTitle = `Test Event ${Date.now()}`;
    await page.goto("https://eventhub.rahulshettyacademy.com/login")
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#login-btn').click();
    await expect(page.getByRole("link",{name : 'Browse Events → '})).toBeVisible();
    // await expect(page.getByRole('link', { name: 'Browse Events →'})).toBeVisible();
    // await page.pause();
    await page.getByRole('button',{name : 'Admin'}).click();
    await page.getByRole('navigation').getByRole('link',{name: 'Manage Events'}).click();
    await page.getByPlaceholder('Event title').fill(eventTitle);
    await page.getByPlaceholder('Describe the event…').fill("Description Added");
    await page.getByLabel('Category').selectOption('Concert');
    
    // await page.getByLabel("Gender").selectOption("Male");
    await page.locator('#city').fill("Bengaluru");
    await page.getByPlaceholder('Venue name & address').fill("Church street, No 7");
    
    await page.getByLabel('Event Date & Time*').fill('2026-05-28T18:30');
    await page.getByLabel('Price ($)').fill('100');
    await page.getByPlaceholder('e.g. 500').fill("500");
    await page.getByRole('button',{name : '+ Add Event'}).click();

    await expect(page.getByText('Event created!')).toBeVisible();
    console.log(`Created event: "${eventTitle}"`);

    
    await page.locator('#nav-events').click();
    
    const eventCard = await page.getByTestId('event-card');
    await expect(eventCard.first()).toBeVisible();

    const targetCard = eventCard.filter({hasText : eventTitle}).first();
    await expect(targetCard).toBeVisible({timeout : 5000});

    const seatsBeforebooking = parseInt(await targetCard.getByText('seat').first().innerText());
    console.log(`Seats before booking : ${seatsBeforebooking}`);

    await targetCard.getByTestId('book-now-btn').click();
    // await page.pause();
    //Book Tickets
    const defaultTicketCount = 1;
   const ticketCount = parseInt(await page.locator('#ticket-count').textContent());
   await expect(ticketCount).toBe(defaultTicketCount);

   await page.getByLabel('Full Name').fill('Amar');
   await page.getByLabel('Email').fill('amar@gmail.com');
   await page.getByLabel('Phone Number').fill('9876543210');
   await page.getByRole('button',{name : 'Confirm Booking'}).click();

   await expect(page.getByText('Booking Confirmed! 🎉')).toBeVisible();

   await page.locator('#nav-events').click();
    await page.reload();
    const targetCardAfter = eventCard.filter({hasText : eventTitle}).first();
    await expect(targetCardAfter).toBeVisible({timeout : 5000});

    const seatsAfterbooking = parseInt(await targetCardAfter.getByText('seat').first().innerText());
    console.log(`Seats after booking : ${seatsAfterbooking}`);

    await expect(seatsAfterbooking).toBe(seatsBeforebooking - 1);


})


test.skip('Create event', async({page})=>
{

    // await page.getByRole("button",{hasText : 'Admin'}).click();
    getByRole('button', { name: 'Admin' })
    getByRole('navigation').getByRole('link', { name: 'Manage Events' })
    await page.pause();
    await page.locator("a[href*='eventhub']").nth[1].click();



})