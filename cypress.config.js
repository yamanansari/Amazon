const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  retries: {
    "runMode": 2,  // Number of retries when running tests via cypress run.
    "openMode": 1  // Number of retries when running tests via cypress open.
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },defaultCommandTimeout:10000
  // resolution
  // 
});

