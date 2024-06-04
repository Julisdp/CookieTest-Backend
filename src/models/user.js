const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('User', userSchema); 