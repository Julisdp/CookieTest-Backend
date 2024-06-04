const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); 
const userRoutes = require('./routes/user');

const app = express();
const port = process.env.PORT || 2000;

app.use(express.json());
app.use('/api', userRoutes);


app.get('/', (req, res) => {
    res.send('Hello World!')}
);

mongoose
.connect(process.env.MONGODB_URI)
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch((error) => console.error(error));

app.listen(port, () => console.log('listening on port' + port));