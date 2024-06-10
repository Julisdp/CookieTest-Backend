const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:2000');
});

test.describe('testing form', () => {
    test('deberia mostrar edad correcta', async ({ page }) => {
        // Espera a que la página cargue y encuentra el input de edad por su id
        await page.waitForSelector('input#edad', { timeout: 60000 }); // Usamos el id "edad"
        await page.fill('input#edad', '15'); // Cambia el selector a usar el id "edad"
        const edad = await page.inputValue('input#edad');
        expect(edad).toBe('15');
    });
});

test.describe('testing form', () => {
    test('deberia mostrar género correcto', async ({ page }) => {
        // Espera a que la página cargue y encuentra el select de género por su id
        await page.waitForSelector('select#sexo', { timeout: 60000 });
        
        // Selecciona la opción "Hombre"
        await page.selectOption('select#sexo', 'Hombre');
        
        // Obtiene el valor seleccionado del select
        const genero = await page.$eval('select#sexo', select => select.value);
        
        // Verifica que el valor seleccionado sea "Hombre"
        expect(genero).toBe('Hombre');
    });
});