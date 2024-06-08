// routes/radarChartData.js
const express = require('express');
const RadarChartData = require('../models/radarChartData');
const router = express.Router();

// Obtener datos para el gráfico de araña
router.get('/obtenerDatos', async (req, res) => {
    try {
        const datos = await RadarChartData.find();
        res.status(200).json(datos);
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener los datos del gráfico', error: err.message });
    }
});

module.exports = router;
