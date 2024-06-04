const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    genero: {
        type: String,
        required: true
    },
    edad: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);