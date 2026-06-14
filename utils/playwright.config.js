// @ts-check
//import { defineConfig, devices } from '@playwright/test';

const {devices} = require('@playwright/test');

const config = ({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },

  reporter:[ ['html'],
  ['allure-playwright']
  ],

use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'
},

  
 
});

module.exports = config;