const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3001", // Ensure your React app is running
    supportFile: false,
    specPattern: "src/tests/**/*.cy.js",
  },
});
