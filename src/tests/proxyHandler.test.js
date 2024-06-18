const mongoose = require('mongoose');
const PollAndUser = require('../models/pollAndUser');
const { proxyHandler } = require('../routes/pollAndUser'); 

jest.mock('../models/pollAndUser');

describe('proxyHandler', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
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

        it('debería crear y devolver una encuesta válida', async () => {
            const mockEncuesta = { ...mockData, _id: new mongoose.Types.ObjectId() };

            PollAndUser.mockImplementation(() => ({
                save: jest.fn().mockResolvedValue(mockEncuesta)
            }));

            const result = await proxyHandler.create(mockData);
            expect(result).toEqual(mockEncuesta);
        });

        it('debería lanzar un error si los datos son inválidos', async () => {
            const invalidData = { rtaAfectivo: 6 };

            await expect(proxyHandler.create(invalidData)).rejects.toThrow('"rtaAfectivo" must be less than or equal to 5');
        });
    });

    describe('getAll', () => {
        it('debería devolver todas las encuestas', async () => {
            const mockEncuestas = [
                { _id: new mongoose.Types.ObjectId(), rtaAfectivo: 3, genero: 'Hombre', edad: 25 }
            ];

            PollAndUser.find.mockResolvedValue(mockEncuestas);

            const result = await proxyHandler.getAll();
            expect(result).toEqual(mockEncuestas);
        });
    });
});
