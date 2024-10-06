/**
 * Importando variables
 */

const express = require('express');

/**
 * @class Server
 * clase servidor que inicia el servicio de express
 */
class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.path = '/api/';
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes JSON
    }

    routes() {
        // Agregar las rutas de usuarios
        this.app.use('/users', require('../routes/users.routes'));
        
        // Agregar las rutas de vehículos
        this.app.use('/vehiculos', require('../routes/users.routes')); // Asegúrate de que la ruta sea correcta
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor funcionando en el puerto: ${this.port}`);
        });
    }
}

module.exports = Server;
