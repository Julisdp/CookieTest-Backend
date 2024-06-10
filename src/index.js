// src/index.js

const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const pollAndUserRoutes = require('./routes/pollAndUser');
const db = require('./database/database') // Importa el Singleton de la base de datos

const app = express();
const port = process.env.PORT || 2000;

// Middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para manejar errores de JSON
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ message: 'Bad JSON format' });
    }
    next();
});

// Usar las rutas de pollAndUser
app.use('/api/encuestas', pollAndUserRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Usar la conexión de la base de datos desde el Singleton
db.getConnection();

app.listen(port, () => console.log('listening on port ' + port));

module.exports = app;
