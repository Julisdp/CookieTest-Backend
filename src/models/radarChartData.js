// models/radarChartData.js
const mongoose = require('mongoose');

const radarChartDataSchema = mongoose.Schema({
    edad: {
        type: Number,
        required: true,
        min: 1
    },
    genero: {
        type: String,
        required: true,
        enum: ['Hombre', 'Mujer', 'Otro']
    },
    rtaAfectivo: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaSuavidad: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaHumedad: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaEsponjosidad: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaFragilidad: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaGrasoso: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaCrocante: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaDureza: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('RadarChartData', radarChartDataSchema);
