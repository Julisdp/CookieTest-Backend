const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const path = require('path');
const pollAndUserRoutes = require('./routes/pollAndUser');
const radarChartDataRoutes = require('./routes/radarChartData');

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

// Usar las rutas de radarChartData
app.use('/api/radarChartData', radarChartDataRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('listening on port ' + port));

module.exports = app;
