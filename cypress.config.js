const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    env: {
      baseUrl: "https://www.saucedemo.com"
    },
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
