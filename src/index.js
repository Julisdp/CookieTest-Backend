const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const userRoutes = require('./routes/user');
const pollRoutes = require('./routes/poll');

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(express.json());

// Middleware para manejar errores de JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ message: 'Bad JSON format' });
    }
    next();
});

app.use('/api', userRoutes);
app.use('/api', pollRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('listening on port ' + port));
