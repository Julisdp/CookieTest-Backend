import { test, expect } from '@playwright/test';

test('Evaluar características de la galletita', async ({ page }) => {
    // Navegar a la página donde se encuentra el formulario
    await page.goto('http://localhost:2000/api/radarChartData/obtenerDatos'); // Cambia la URL según tu entorno

    // Rellenar el formulario con datos ficticios (puedes adaptarlo según tus necesidades)
    await page.fill('#nombre', 'Galletita de prueba');
    await page.fill('#suavidad', '4'); // Valor de suavidad (de 1 a 5)
    await page.fill('#humedad', '3'); // Valor de humedad (de 1 a 5)
    await page.fill('#esponjosidad', '5'); // Valor de esponjosidad (de 1 a 5)
    await page.fill('#fragilidad', '2'); // Valor de fragilidad (de 1 a 5)
    await page.fill('#grasoso', '1'); // Valor de grasosidad (de 1 a 5)
    await page.fill('#crocante', '3'); // Valor de crocantez (de 1 a 5)
    await page.fill('#dureza', '4'); // Valor de dureza (de 1 a 5)

    // Hacer clic en el botón de enviar
    await page.click('#enviar');

    // Esperar a que se cargue la página de resultados (ajusta el selector según tu caso)
    await page.waitForSelector('.resultados');

    // Verificar si la galletita cumple con las características deseadas
    const resultado = await page.textContent('.resultados');
    await expect(resultado).toContain('Cumple con las características'); // Ajusta el texto según tu aplicación
});

test('Verifica la conexión a la base de datos', async ({ page }) => {
    // Navega a la página principal de tu aplicación (cambia la URL según tu caso)
    await page.goto('http://localhost:2000/api/radarChartData/obtenerDatos');

    // Realiza una acción que confirme la conexión a la base de datos
    // Por ejemplo, verifica si un elemento específico está presente en la página
    const elementoConectado = await page.waitForSelector('#elemento-conectado');

    // Asegúrate de que el elemento esté presente
    expect(elementoConectado).toBeTruthy();
});
