// src/database.js

const mongoose = require('mongoose');

class Database {
    constructor() {
        this._connect();
    }

    _connect() {
        if (this.connection) {
            return this.connection;
        }

        mongoose
            .connect(process.env.MONGODB_URI, {
            })
            .then((conn) => {
                console.log('Conectado a MongoDB');
                this.connection = conn;
            })
            .catch((error) => {
                console.error('Error al conectar a MongoDB:', error.message);
            });
    }

    getConnection() {
        if (!this.connection) {
            this._connect();
        }
        return this.connection;
    }
}

module.exports = new Database();
