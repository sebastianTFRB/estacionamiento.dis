// Clase Ficha
class Ficha {
    constructor(idFicha, estadoPago, fechaEntrada, fechaSalida) {
        this.idFicha = idFicha;
        this.estadoPago = estadoPago;  // Booleano que indica si el pago ha sido realizado o no
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida || null; // Fecha de salida puede estar vacía hasta que se realice la salida
    }

    // Método para registrar la fecha de salida
    registrarSalida() {
        this.fechaSalida = new Date(); // Actualiza la fecha de salida a la fecha actual
    }

    // Método para marcar el estado de pago
    cambiarEstadoPago(estado) {
        this.estadoPago = estado;
    }
}

module.exports = Ficha;
