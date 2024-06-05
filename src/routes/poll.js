const express = require('express');
const Poll = require('../models/poll');

const router = express.Router();

// Crear una nueva encuesta
router.post('/polls', (req, res) => {
    const poll = new Poll(req.body);
    poll.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener todas las encuestas
router.get('/polls', (req, res) => {
    Poll.find()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Obtener una encuesta por ID
router.get('/polls/:id', (req, res) => {
    Poll.findById(req.params.id)
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Actualizar una encuesta por ID
router.put('/polls/:id', (req, res) => {
    Poll.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

// Eliminar una encuesta por ID
router.delete('/polls/:id', (req, res) => {
    Poll.findByIdAndDelete(req.params.id)
        .then((data) => res.json({ message: 'Poll deleted' }))
        .catch((error) => res.status(400).json({ message: error.message }));
});

module.exports = router;
