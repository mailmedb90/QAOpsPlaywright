// @ts-check
//import { defineConfig, devices } from '@playwright/test';

const { devices, chromium } = require('@playwright/test');
const { permission } = require('process');
const { workers } = require('./playwright.config');

const config = ({
  testDir: './tests',
  // retries: 1,
  workers:2,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },
  //Uses the test timeout unless configured. Example: await page.locator('#submit').click();
  // actionTimeout: 10 * 1000,

  reporter: 'html',
  projects:[
    {
      name: 'chrome',
    use:{
      browserName:'chromium',
      headless:false,
      screenshot: 'on',
      video:'retain-on-failure',
      trace: 'on',
     // ...devices['Galaxy S8'],
      //viewport:{width:720,height:720},
      Permissions:['geolocation'],
      ignoreHttpsErrors:true,
    }
  },
    {
      name:'webkit',
      use:{
          browserName:'webkit',
          headless: false,
          screenshot: 'on',
          trace: 'on',
        ...devices['iPhone 11'],
      }

    }



  ]
  ,



});

module.exports = config;