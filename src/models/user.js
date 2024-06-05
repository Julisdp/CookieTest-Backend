const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    age: {
        type: Number,
        required: true,
        min: 1
    }
});

module.exports = mongoose.model('User', userSchema);
