const mongoose = require('mongoose');

const pollAndUserSchema = mongoose.Schema({
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
    },
    genero: {
        type: String,
        required: true,
        enum: ['Hombre', 'Mujer', 'Otro']
    },
    edad: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('PollAndUser', pollAndUserSchema);
