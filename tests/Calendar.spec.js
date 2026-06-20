//Author : Bhaskar
const {test, expect, chromium, firefox, webkit} = require('@playwright/test')

test('calander test', async({page})=>
{

  const calanderDate = '2';
  const calanderMonth = '3';
  const calanderYear  = '2027'
  const expectedList =[calanderMonth,calanderDate,calanderYear];
// const browser = await webkit.launch();
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers")
await page.waitForLoadState("networkidle");
await page.locator('.react-date-picker').click();
await page.locator('.react-calendar__navigation__label').dblclick();
await page.getByRole('button',{name: calanderYear}).click();

const monthLocator = page.locator('.react-calendar__year-view__months__month').nth(Number(calanderMonth)-1);
const monthName = await monthLocator.textContent();
// await page.locator('.react-calendar__month-view__days__day').getByText(calanderDate,{exact:true}).click();
await monthLocator.click()
await page.getByRole('button',{name: `${monthName} ${calanderDate}, ${calanderYear}`}).click();

const inputs = page.locator('.react-date-picker__inputGroup__input');

for(let i=0; i<expectedList.length; i++)
{

  const value = await inputs.nth(i).inputValue();
  expect(value).toEqual(expectedList[i]);

}


})

