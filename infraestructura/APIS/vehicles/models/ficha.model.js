class Ficha {
    constructor(idFicha, fechaEntrada, fechaSalida = null) {
        this.idFicha = idFicha;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida || null; // La fecha de salida se asigna cuando el vehículo se va
    }

    // Método para registrar la fecha de salida y asumir que el pago se realizó
    registrarSalida() {
        this.fechaSalida = new Date(); // Actualiza la fecha de salida
    }

    // Verifica si el vehículo ha pagado, lo que asumimos por la existencia de una fecha de salida
    estaPagado() {
        return this.fechaSalida !== null;
    }
}

module.exports = Ficha;
