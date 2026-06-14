// @ts-check
//import { defineConfig, devices } from '@playwright/test';

const {devices} = require('@playwright/test');

const config = ({
  testDir: './tests',
  workers: 3,
  timeout: 30 * 1000,
  expect: {
    timeout: 5 * 1000
  },

  reporter: 'html',

use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'on'
},

  
 
});

module.exports = config;