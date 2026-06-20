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
    storageState:'state1.json',
    headless: true,
    screenshot: 'on',
    trace: 'on'
},

  
 
});

module.exports = config;