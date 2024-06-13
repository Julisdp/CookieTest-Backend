const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const PollAndUser = require('../models/pollAndUser'); 
const pollAndUserRoutes = require('../routes/pollAndUser'); 

// Configuración de la aplicación Express
const app = express();
app.use(express.json());
app.use('/api/encuestas', pollAndUserRoutes);

describe('GET /api/encuestas/obtenerEncuestas', () => {
    // Limpiar mocks después de cada test
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería devolver 200 y todas las encuestas si la solicitud es exitosa', async () => {
        // Crear encuestas simuladas con ObjectId
        const encuestas = [
            {
                rtaAfectivo: 3,
                rtaSuavidad: 4,
                rtaHumedad: 5,
                rtaEsponjosidad: 2,
                rtaFragilidad: 1,
                rtaGrasoso: 3,
                rtaCrocante: 4,
                rtaDureza: 5,
                genero: 'Hombre',
                edad: 25,
                _id: new mongoose.Types.ObjectId()
            },
            {
                rtaAfectivo: 2,
                rtaSuavidad: 3,
                rtaHumedad: 4,
                rtaEsponjosidad: 5,
                rtaFragilidad: 2,
                rtaGrasoso: 1,
                rtaCrocante: 2,
                rtaDureza: 3,
                genero: 'Mujer',
                edad: 30,
                _id: new mongoose.Types.ObjectId()
            }
        ];

        // Mockear el método find de PollAndUser para devolver las encuestas simuladas
        jest.spyOn(PollAndUser, 'find').mockResolvedValue(encuestas);

        // Realizar una solicitud GET al endpoint
        const res = await request(app).get('/api/encuestas/obtenerEncuestas');

        // Convertir ObjectIds a strings antes de comparar
        const encuestasEsperadas = encuestas.map(encuesta => ({
            ...encuesta,
            _id: encuesta._id.toString()
        }));

        // Verificar que la respuesta tenga el estado 200
        expect(res.status).toBe(200);
        // Verificar que la respuesta sea igual a las encuestas esperadas
        expect(res.body).toEqual(encuestasEsperadas);
    });

    it('debería devolver 500 si ocurre un error al obtener las encuestas', async () => {
        // Crear un error simulado
        const error = new Error('Database error');
        // Mockear el método find de PollAndUser para lanzar un error
        jest.spyOn(PollAndUser, 'find').mockRejectedValue(error);

        // Realizar una solicitud GET al endpoint
        const res = await request(app).get('/api/encuestas/obtenerEncuestas');

        // Verificar que la respuesta tenga el estado 500
        expect(res.status).toBe(500);
        // Verificar que el mensaje de error esté presente en la respuesta
        expect(res.body).toHaveProperty('message', 'Error al obtener las encuestas');
        // Verificar que el mensaje de error coincida con el mensaje del error simulado
        expect(res.body).toHaveProperty('error', error.message);
    });
});
