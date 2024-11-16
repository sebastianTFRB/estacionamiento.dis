class Parqueadero {
    constructor(cantPuestos) {
        this.cantPuestos = cantPuestos; // Cantidad de puestos disponibles
        this.listaVehiculos = []; // Lista de vehículos que están ocupando un puesto
    }

    // Verificar si hay espacio en el parqueadero
    hayEspacio() {
        return this.listaVehiculos.length < this.cantPuestos;
    }

    // Agregar un vehículo al parqueadero
    agregarVehiculo(vehiculo) {
        if (this.hayEspacio()) {
            this.listaVehiculos.push(vehiculo);
            console.log(`Vehículo con placa ${vehiculo.placa} agregado.`);
            return true;
        } else {
            console.log("No hay espacio disponible.");
            return false;
        }
    }

    // Eliminar un vehículo del parqueadero
    eliminarVehiculo(placa) {
        const index = this.listaVehiculos.findIndex(v => v.placa === placa);
        if (index !== -1) {
            this.listaVehiculos.splice(index, 1);
            console.log(`Vehículo con placa ${placa} eliminado.`);
        }
    }

    // Mostrar los vehículos en el parqueadero
    verVehiculos() {
        return this.listaVehiculos;
    }
}

module.exports = Parqueadero;
