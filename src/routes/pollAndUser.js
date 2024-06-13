// src/routes/pollAndUser.js

const express = require('express');
const PollAndUser = require('../models/pollAndUser');
const Joi = require('joi');

const router = express.Router();

// Esquema de validación con Joi
const pollAndUserSchema = Joi.object({
    rtaAfectivo: Joi.number().integer().min(1).max(5).required(),
    rtaSuavidad: Joi.number().integer().min(1).max(5).required(),
    rtaHumedad: Joi.number().integer().min(1).max(5).required(),
    rtaEsponjosidad: Joi.number().integer().min(1).max(5).required(),
    rtaFragilidad: Joi.number().integer().min(1).max(5).required(),
    rtaGrasoso: Joi.number().integer().min(1).max(5).required(),
    rtaCrocante: Joi.number().integer().min(1).max(5).required(),
    rtaDureza: Joi.number().integer().min(1).max(5).required(),
    genero: Joi.string().valid('Hombre', 'Mujer', 'Otro').required(),
    edad: Joi.number().integer().min(1).required()
});

// Proxy para manejo de creación y obtención de encuestas
const proxyHandler = {
    create: async (data) => {
        console.log('Intentando crear encuesta con datos:', data);
        const { error } = pollAndUserSchema.validate(data);
        if (error) {
            console.error('Error en la validación:', error.details[0].message);
            throw new Error(error.details[0].message);
        }
        console.log('Encuesta validada correctamente.');
        return await new PollAndUser(data).save();
    },
    getAll: async () => {
        console.log('Obteniendo todas las encuestas...');
        return await PollAndUser.find();
    }
};

// Ruta para crear una nueva encuesta y usuario
router.post('/agregarEncuesta', async (req, res, next) => {
    try {
        const encuestaGuardada = await proxyHandler.create(req.body);
        res.status(201).json(encuestaGuardada);
    } catch (err) {
        console.error('Error al crear encuesta:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Ruta para obtener todas las encuestas
router.get('/obtenerEncuestas', async (req, res) => {
    try {
        const encuestas = await proxyHandler.getAll();
        res.status(200).json(encuestas);
    } catch (err) {
        console.error('Error al obtener encuestas:', err.message);
        res.status(500).json({ message: 'Error al obtener las encuestas', error: err.message });
    }
});

module.exports = {
    router,
    proxyHandler
};