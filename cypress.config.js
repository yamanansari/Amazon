const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "5wv9yp",
  viewportWidth: 1280,
  viewportHeight: 720,
  chromeWebSecurity: false,
  defaultCommandTimeout:10000,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  cacheAcrossSpecs: true,
  video: true,
  // retries: {
  //   "runMode": 2,  // Number of retries when running tests via cypress run.
  //   "openMode": 1  // Number of retries when running tests via cypress open.
  // },
  env: {
    // Environment variables
    CYPRESS_RECORD_KEY: process.env.CYPRESS_RECORD_KEY,
  },
  e2e: {
   baseUrl: 'https://www.amazon.in',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  }
  // resolution
  // 
});

