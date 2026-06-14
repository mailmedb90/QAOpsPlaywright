import { test, expect } from '@playwright/test';

const BASE_URL = 'https://eventhub.rahulshettyacademy.com';
const API_URL = 'https://api.eventhub.rahulshettyacademy.com/api';

const YAHOO_USER = { email: 'amar@yahoo.com', password: 'Amar@12345' };
const GMAIL_USER = { email: 'bhaskara4all@gmail.com', password: 'Bhaskar@12345' };

const eventsObjectpayLoad = {
  success: true,
  data: [
    {
      id: 3,
      title: 'Dilli Diwali Mela',
      description: 'Celebrate the Festival of Lights at the grandest Diwali Mela in North India. Enjoy 200+ stalls of artisanal crafts, street food, folk performances, fireworks, and cultural showcases spanning three vibrant evenings.',
      category: 'Festival',
      venue: 'Pragati Maidan Exhibition Grounds',
      city: 'Delhi',
      eventDate: '2026-10-20T17:00:00.000Z',
      price: '300',
      totalSeats: 10000,
      availableSeats: 10000,
      imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800',
      isStatic: true,
      userId: null,
      createdAt: '2026-02-22T23:03:37.680Z',
      updatedAt: '2026-05-29T05:44:25.067Z'
    },
    {
      id: 2,
      title: 'Hollywood Monsoon Night — Los Angeles',
      description: 'An unforgettable evening of live music performed by A-list playback singers under the open Mumbai sky. Featuring chart-toppers from the last three decades with a stunning light show and pyrotechnics.',
      category: 'Concert',
      venue: 'Dome, NSCI SVP Stadium, Worli',
      city: 'Los Angeles',
      eventDate: '2026-07-11T19:00:00.000Z',
      price: '2500',
      totalSeats: 3000,
      availableSeats: 3000,
      imageUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800',
      isStatic: true,
      userId: null,
      createdAt: '2026-02-22T23:03:37.669Z',
      updatedAt: '2026-06-05T08:08:41.604Z'
    },
    {
      id: 1,
      title: 'World Tech Summit',
      description: 'A premier technology conference bringing together 500+ industry leaders, startup founders, and engineers for two days of keynotes, workshops, and networking. Topics include AI/ML, cloud infrastructure, DevSecOps, and the future of the Indian tech ecosystem.',
      category: 'Conference',
      venue: 'Hyderabad, Hitech city',
      city: 'Hyderabad',
      eventDate: '2026-04-18T09:00:00.000Z',
      price: '1500',
      totalSeats: 500,
      availableSeats: 500,
      imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      isStatic: true,
      userId: null,
      createdAt: '2026-02-22T23:03:37.659Z',
      updatedAt: '2026-05-23T06:57:02.677Z'
    }
  ],
  pagination: { total: 3, page: 1, limit: 10, totalPages: 1 }
}


async function loginAs(page, user) {
  await page.goto(`${BASE_URL}/login`);
  await page.getByPlaceholder('you@email.com').fill(user.email);
  await page.getByLabel('Password').fill(user.password);
  await page.locator('#login-btn').click();
  await expect(page.getByRole('link', { name: 'Browse Events →' })).toBeVisible();
}

test('gmail user sees Access Denied when viewing yahoo user booking', async ({ page, request }) => {

  // ── Step 1: Login as Yahoo user via API and get token ─────────────────────
  const loginRes = await request.post("https://api.eventhub.rahulshettyacademy.com/api/auth/login",
    {

      data: YAHOO_USER

    })

  expect(loginRes.ok()).toBeTruthy();
  const { token } = await loginRes.json();
  console.log(`${token}`);

  const eventsResp = await request.get("https://api.eventhub.rahulshettyacademy.com/api/events",
    {
      headers:
      {

        Authorization: `Bearer ${token}`
      },
    })
  expect(eventsResp.ok()).toBeTruthy();
  const eventsData = await eventsResp.json();
  const eventId = await eventsData.data[0].id;
  console.log(eventsData);
  console.log(eventId);
  // expect(eventsData).toEqual(eventsObjectpayLoad);
   expect(eventsData).toMatchObject(eventsObjectpayLoad);


  const bookingRes = await request.post("https://api.eventhub.rahulshettyacademy.com/api/bookings",
    {
      headers:
      {

        Authorization: `Bearer ${token}`

      },
      data:
      {
        eventId,
        customerName: "amar",
        customerEmail: "amar@gmail.com",
        customerPhone: "9876543210",
        quantity: 3,
      },

    })
    expect(bookingRes.ok()).toBeTruthy();
//  console.log("Status:", bookingRes.status());
//  console.log("Response:", await bookingRes.text());
    const bookingData = await bookingRes.json();
    const yahooBookingId = await bookingData.data.id;
    console.log(`Yahoo booking successful Via API and Booking Id is: ${yahooBookingId}`)

    await loginAs(page,GMAIL_USER)
    await page.goto(`https://eventhub.rahulshettyacademy.com/bookings/${yahooBookingId}`);
    // await page.pause();
    await expect(page.getByText('Access Denied')).toBeVisible();
    await expect(page.getByText('You are not authorized to view this booking.')).toBeVisible();

});
