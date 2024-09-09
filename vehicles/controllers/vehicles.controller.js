/**
 * @author rick
 * @version 1.0.0
 * 
 * Controlador de vehículos
 * Este archivo define los controladores de vehículos en el parqueadero
 */

const { request, response } = require('express');
const { Vehiculo, Carro, Moto } = require('../models/vehiculo.model');
const Parqueadero = require('../models/parqueadero.model');

// Instancia del parqueadero (definimos que tiene 10 puestos disponibles)
const parqueadero = new Parqueadero(10);

// Muestra todos los vehículos en el parqueadero
const ShowVehicles = async (req = request, res = response) => {
    const listaVehiculos = parqueadero.verListaVehiculos();
    res.json({
        "message": "Lista de todos los vehículos en el parqueadero",
        "vehicles": listaVehiculos
    });
};

// Agrega un nuevo vehículo al parqueadero
const AddVehicle = async (req = request, res = response) => {
    const { placa, modelo, marca, color, tipo, atributo } = req.body;

    let nuevoVehiculo;

    if (tipo === 'carro') {
        nuevoVehiculo = new Carro(placa, modelo, marca, color, new Date(), null, atributo);
    } else if (tipo === 'moto') {
        nuevoVehiculo = new Moto(placa, modelo, marca, color, new Date(), null, atributo);
    }

    parqueadero.agregarVehiculo(nuevoVehiculo);

    res.json({
        "message": "Vehículo agregado exitosamente",
        "vehicle": nuevoVehiculo
    });
};

// Muestra un vehículo por su placa
const ShowVehicle = async (req = request, res = response) => {
    const { placa } = req.params; // Placa del vehículo

    // Buscar el vehículo por su placa en el parqueadero
    const vehiculo = parqueadero.verListaVehiculos().find(v => v.placa === placa);

    if (!vehiculo) {
        return res.status(404).json({
            "message": `Vehículo con placa ${placa} no encontrado`
        });
    }

    res.json({
        "message": `Detalles del vehículo con placa ${placa}`,
        "vehicle": vehiculo
    });
};

// Edita un vehículo por su placa
const EditVehicle = async (req = request, res = response) => {
    const { placa } = req.params;
    const { modelo, marca, color, atributo } = req.body; // Nuevos datos del vehículo

    // Buscar el vehículo a editar en la lista
    let vehiculo = parqueadero.verListaVehiculos().find(v => v.placa === placa);

    if (!vehiculo) {
        return res.status(404).json({
            "message": `Vehículo con placa ${placa} no encontrado`
        });
    }

    // Actualizar los datos del vehículo
    vehiculo.modelo = modelo || vehiculo.modelo;
    vehiculo.marca = marca || vehiculo.marca;
    vehiculo.color = color || vehiculo.color;

    if (vehiculo instanceof Carro) {
        vehiculo.numPuertas = atributo || vehiculo.numPuertas;
    } else if (vehiculo instanceof Moto) {
        vehiculo.cilindraje = atributo || vehiculo.cilindraje;
    }

    res.json({
        "message": `Vehículo con placa ${placa} actualizado exitosamente`,
        "updatedVehicle": vehiculo
    });
};

// Elimina un vehículo por su placa
const DeleteVehicle = async (req = request, res = response) => {
    const { placa } = req.params;

    // Filtrar la lista de vehículos para eliminar el que tiene la placa indicada
    const vehiculosFiltrados = parqueadero.verListaVehiculos().filter(v => v.placa !== placa);

    if (vehiculosFiltrados.length === parqueadero.verListaVehiculos().length) {
        return res.status(404).json({
            "message": `Vehículo con placa ${placa} no encontrado`
        });
    }

    parqueadero.listaVehiculos = vehiculosFiltrados;

    res.json({
        "message": `Vehículo con placa ${placa} eliminado exitosamente`
    });
};

module.exports = {
    ShowVehicles,
    AddVehicle,
    ShowVehicle,
    EditVehicle,
    DeleteVehicle
};
