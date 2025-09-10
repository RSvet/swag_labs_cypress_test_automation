const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {

    },
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
