const { Vehiculo } = require('./vehiculo.model');

// Clase Parqueadero
class Parqueadero {
    constructor(cantPuestos) {
        this.cantPuestos = cantPuestos;
        this.listaVehiculos = [];
    }

    // Método para agregar un vehículo
    agregarVehiculo(vehiculo) {
        if (this.listaVehiculos.length < this.cantPuestos) {
            this.listaVehiculos.push(vehiculo);
            console.log(`Vehículo con placa ${vehiculo.placa} agregado al parqueadero.`);
        } else {
            console.log("No hay espacio disponible en el parqueadero.");
        }
    }

    // Método para mostrar la lista de vehículos
    verListaVehiculos() {
        return this.listaVehiculos;
    }
}

module.exports = Parqueadero;
