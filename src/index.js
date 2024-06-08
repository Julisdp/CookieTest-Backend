// index.js
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const connectDB = require('./config/db');
const pollAndUserRoutes = require('./routes/pollAndUser');
const radarChartDataRoutes = require('./routes/radarChartData');

const app = express();
const port = process.env.PORT || 2000;

// Conectar a la base de datos
connectDB().catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
});

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

app.listen(port, () => console.log('listening on port ' + port));

module.exports = app;
