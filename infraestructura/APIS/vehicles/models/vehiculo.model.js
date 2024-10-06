// Clase Vehiculo
class Vehiculo {
    constructor(placa, modelo, marca, color, fechaEntrada, fechaSalida) {
        this.placa = placa;
        this.modelo = modelo;
        this.marca = marca;
        this.color = color;
        this.fechaEntrada = fechaEntrada;
        this.fechaSalida = fechaSalida;
    }

    // Método para pagar el estacionamiento
    pagar() {
        console.log(`El vehículo con placa ${this.placa} ha pagado el estacionamiento.`);
    }
}

// Clase Carro (hereda de Vehiculo)
class Carro extends Vehiculo {
    constructor(placa, modelo, marca, color, fechaEntrada, fechaSalida, numPuertas) {
        super(placa, modelo, marca, color, fechaEntrada, fechaSalida);
        this.numPuertas = numPuertas;
    }
}

// Clase Moto (hereda de Vehiculo)
class Moto extends Vehiculo {
    constructor(placa, modelo, marca, color, fechaEntrada, fechaSalida, cilindraje) {
        super(placa, modelo, marca, color, fechaEntrada, fechaSalida);
        this.cilindraje = cilindraje;
    }
}

module.exports = {
    Vehiculo,
    Carro,
    Moto
};
