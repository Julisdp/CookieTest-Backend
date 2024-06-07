const express = require('express');
const PollAndUser = require('../models/pollAndUser.js');
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

// Crear una nueva encuesta y usuario
router.post('/agregarEncuesta', async (req, res, next) => {
    try {
        const { error, value } = pollAndUserSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Crear y guardar la nueva encuesta y usuario
        const pollAndUser = new PollAndUser(value);
        const encuestaGuardada = await pollAndUser.save();
        res.status(201).json(encuestaGuardada);
    } catch (err) {
        next(err);
    }
});

// Obtener todas las encuestas
router.get('/obtenerEncuestas', async (req, res) => {
    try {
        const encuestas = await PollAndUser.find();
        res.status(200).json(encuestas);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener las encuestas', error: err.message });
    }
});

module.exports = router;
