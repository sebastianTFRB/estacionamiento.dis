const Ficha = require('./ficha.model');

// Clase Admin
class Admin {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    // Método para gestionar el parqueadero (esto es solo un ejemplo, puedes adaptarlo a tus necesidades)
    gestionarParqueadero(parqueadero) {
        console.log(`El administrador ${this.username} está gestionando el parqueadero.`);
        // Aquí podrías agregar lógica para gestionar el parqueadero
    }

    // Método para emitir una ficha
    emitirFicha(vehiculo) {
        const nuevaFicha = new Ficha(
            Math.floor(Math.random() * 1000), // ID de la ficha generado de forma aleatoria
            false, // Estado de pago en falso por defecto
            new Date(), // Fecha de entrada es la fecha actual
            null // Fecha de salida nula por defecto
        );
        console.log(`Ficha emitida para el vehículo con placa ${vehiculo.placa}`);
        return nuevaFicha;
    }

    // Método para cambiar el estado de pago de una ficha
    cambiarEstadoPago(ficha, estado) {
        ficha.cambiarEstadoPago(estado);
        console.log(`El estado de pago de la ficha con ID ${ficha.idFicha} ha sido cambiado a ${estado}`);
    }
}

module.exports = Admin;
