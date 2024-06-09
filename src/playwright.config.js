const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Directorio donde se encuentran tus pruebas
  use: {
    headless: true, // Opcional: si quieres ejecutar las pruebas en modo headless
  },
});
