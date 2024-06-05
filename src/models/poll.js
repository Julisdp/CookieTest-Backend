const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
    rtaAfectivo: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    rtaSuabidad: {
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Poll', pollSchema);
