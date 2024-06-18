const express = require('express');
const request = require('supertest');
const mongoose = require('mongoose');
const PollAndUser = require('../models/pollAndUser');
const { router } = require('../routes/pollAndUser'); 

jest.mock('../models/pollAndUser');

const app = express();
app.use(express.json());
app.use('/api/encuestas', router); 

describe('POST /api/encuestas/agregarEncuesta', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería crear una nueva encuesta y devolver 201', async () => {
        const mockData = {
            rtaAfectivo: 3,
            rtaSuavidad: 4,
            rtaHumedad: 5,
            rtaEsponjosidad: 3,
            rtaFragilidad: 2,
            rtaGrasoso: 1,
            rtaCrocante: 4,
            rtaDureza: 5,
            genero: 'Hombre',
            edad: 25
        };
        const mockEncuesta = { ...mockData, _id: new mongoose.Types.ObjectId() };
        
        PollAndUser.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockEncuesta)
        }));

        const res = await request(app)
            .post('/api/encuestas/agregarEncuesta')
            .send(mockData);

        expect(res.status).toBe(201);
        expect(res.body).toEqual({ ...mockData, _id: mockEncuesta._id.toString() });
    });

    it('debería devolver 400 si los datos son inválidos', async () => {
        const invalidData = { rtaAfectivo: 6 };

        const res = await request(app)
            .post('/api/encuestas/agregarEncuesta')
            .send(invalidData);

        expect(res.status).toBe(400);
        expect(res.body).toHaveProperty('mensaje');
        expect(res.body.message).toContain('"rtaAfectivo" tiene que ser menor o igual a 5');
    });
});
