const express = require('express');
const Poll = require('../models/poll');
const User = require('../models/user');
const Joi = require('joi');

const router = express.Router();

const pollSchema = Joi.object({
    rtaAfectivo: Joi.number().integer().min(1).max(5).required(),
    rtaSuabidad: Joi.number().integer().min(1).max(5).required(),
    rtaHumedad: Joi.number().integer().min(1).max(5).required(),
    rtaEsponjosidad: Joi.number().integer().min(1).max(5).required(),
    rtaFragilidad: Joi.number().integer().min(1).max(5).required(),
    rtaGrasoso: Joi.number().integer().min(1).max(5).required(),
    rtaCrocante: Joi.number().integer().min(1).max(5).required(),
    rtaDureza: Joi.number().integer().min(1).max(5).required(),
    user: Joi.string().required()
});

// Crear una nueva encuesta
router.post('/polls', async (req, res) => {
    const { error, value } = pollSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    try {
        const user = await User.findById(value.user);
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const poll = new Poll(value);
        await poll.save();
        res.json(poll);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Obtener todas las encuestas
router.get('/polls', async (req, res) => {
    try {
        const polls = await Poll.find().populate('user', 'gender age');
        res.json(polls);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
