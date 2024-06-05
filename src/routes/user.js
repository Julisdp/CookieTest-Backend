const express = require('express');
const User = require('../models/user');
const Joi = require('joi');

const router = express.Router();

const userSchema = Joi.object({
    gender: Joi.string().valid('male', 'female', 'other').required(),
    age: Joi.number().integer().min(1).required()
});

router.post('/users', (req, res) => {
    const { error, value } = userSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const user = new User(value);
    user.save()
        .then((data) => res.json(data))
        .catch((error) => res.status(400).json({ message: error.message }));
});

router.post('/users', (req, res) => {
    console.log('POST /users', req.body);
    const user = new userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({ message: error.message }));
});


module.exports = router;
