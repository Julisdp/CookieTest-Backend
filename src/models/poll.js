const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    rtaAfectivo: {
        type: Number,
        required: true
    },
    rtaSuabidad: {
        type: Number,
        required: true
    },
    rtaHumedad: {
        type: Number,
        required: true
    },
    rtaEsponjosidad: {
        type: Number,
        required: true
    },
    rtaFragilidad: {
        type: Number,
        required: true
    },
    rtaGrasoso: {
        type: Number,
        required: true
    },
    rtaCrocante: {
        type: Number,
        required: true
    },
    rtaDureza: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Poll', pollSchema);
