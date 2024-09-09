/**
 * @author rick
 * @version 1.0.0
 * 
 * Controlador de vehículos
 * Este archivo define los controladores de vehículos en el parqueadero
 */

const { response, request } = require('express');

// Base de datos ficticia para vehículos
let vehiculos = [];

// Muestra todos los vehículos
const ShowVehicles = async (req = request, res = response) => {
    // Aquí podrías recuperar los vehículos de la base de datos
    res.json({
        "message": "Lista de todos los vehículos en el parqueadero",
        "vehicles": vehiculos
    });
};

// Agrega un nuevo vehículo
const AddVehicle = async (req = request, res = response) => {
    const { placa, modelo, marca, color, tipo, atributo } = req.body; // Datos enviados en la solicitud

    let nuevoVehiculo;

    if (tipo === 'carro') {
        nuevoVehiculo = {
            placa,
            modelo,
            marca,
            color,
            numPuertas: atributo,  // El número de puertas para el carro
            tipo: 'carro'
        };
    } else if (tipo === 'moto') {
        nuevoVehiculo = {
            placa,
            modelo,
            marca,
            color,
            cilindraje: atributo,  // El cilindraje para la moto
            tipo: 'moto'
        };
    }

    // Guardamos el nuevo vehículo en la lista
    vehiculos.push(nuevoVehiculo);

    res.json({
        "message": "Vehículo agregado exitosamente",
        "vehicle": nuevoVehiculo
    });
};

// Muestra un vehículo por placa
const ShowVehicle = async (req = request, res = response) => {
    const { placa } = req.params; // Placa del vehículo

    // Buscar el vehículo por placa en la lista
    const vehiculo = vehiculos.find(v => v.placa === placa);

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

// Edita un vehículo por placa
const EditVehicle = async (req = request, res = response) => {
    const { placa } = req.params;
    const { modelo, marca, color, atributo } = req.body; // Nuevos datos del vehículo

    // Encontramos el vehículo a editar
    let vehiculo = vehiculos.find(v => v.placa === placa);

    if (!vehiculo) {
        return res.status(404).json({
            "message": `Vehículo con placa ${placa} no encontrado`
        });
    }

    // Actualizamos los datos del vehículo
    vehiculo.modelo = modelo || vehiculo.modelo;
    vehiculo.marca = marca || vehiculo.marca;
    vehiculo.color = color || vehiculo.color;

    // Dependiendo si es carro o moto, actualizamos su atributo específico
    if (vehiculo.tipo === 'carro') {
        vehiculo.numPuertas = atributo || vehiculo.numPuertas;
    } else if (vehiculo.tipo === 'moto') {
        vehiculo.cilindraje = atributo || vehiculo.cilindraje;
    }

    res.json({
        "message": `Vehículo con placa ${placa} actualizado exitosamente`,
        "updatedVehicle": vehiculo
    });
};

// Elimina un vehículo por placa
const DeleteVehicle = async (req = request, res = response) => {
    const { placa } = req.params;

    // Filtramos la lista de vehículos eliminando el vehículo con la placa dada
    const vehiculosFiltrados = vehiculos.filter(v => v.placa !== placa);

    if (vehiculosFiltrados.length === vehiculos.length) {
        return res.status(404).json({
            "message": `Vehículo con placa ${placa} no encontrado`
        });
    }

    // Actualizamos la lista
    vehiculos = vehiculosFiltrados;

    res.json({
        "message": `Vehículo con placa ${placa} eliminado exitosamente`
    });
};

module.exports = {
    AddVehicle,
    ShowVehicles,
    ShowVehicle,
    EditVehicle,
    DeleteVehicle
};
