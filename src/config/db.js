// config/db.js
const mongoose = require('mongoose');

let dbConnection = null;

const connectDB = async () => {
    if (dbConnection) {
        console.log('Usando conexión existente a MongoDB');
        return dbConnection;
    }

    try {
        dbConnection = await mongoose.connect("mongodb+srv://nutri:admin@cluster0.dtysquo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
        });
        console.log('Conectado a MongoDB');
        return dbConnection;
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error);
        throw error;
    }
};

module.exports = connectDB;
