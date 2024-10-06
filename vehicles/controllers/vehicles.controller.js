const { request, response } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Muestra todos los vehículos en el parqueadero
const ShowVehicles = async (req = request, res = response) => {
    const listaVehiculos = await prisma.vehiculo.findMany();
    res.json({
        "message": "Lista de todos los vehículos en el parqueadero",
        "vehicles": listaVehiculos
    });
};

// Agrega un nuevo vehículo al parqueadero
const AddVehicle = async (req = request, res = response) => {
    const { placa, modelo, marca, color, tipo, atributo } = req.body;

    try {
        const nuevoVehiculo = await prisma.vehiculo.create({
            data: {
                placa,
                modelo,
                marca,
                color,
                tipo,
                atributo,
            },
        });

        res.json({
            "message": "Vehículo agregado exitosamente",
            "vehicle": nuevoVehiculo
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al agregar el vehículo",
            "error": error.message
        });
    }
};

// Muestra un vehículo por su placa
const ShowVehicle = async (req = request, res = response) => {
    const { placa } = req.params;

    try {
        const vehiculo = await prisma.vehiculo.findUnique({
            where: { placa },
        });

        if (!vehiculo) {
            return res.status(404).json({
                "message": `Vehículo con placa ${placa} no encontrado`
            });
        }

        res.json({
            "message": `Detalles del vehículo con placa ${placa}`,
            "vehicle": vehiculo
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al buscar el vehículo",
            "error": error.message
        });
    }
};

// Edita un vehículo por su placa
const EditVehicle = async (req = request, res = response) => {
    const { placa } = req.params;
    const { modelo, marca, color, atributo } = req.body; // Nuevos datos del vehículo

    try {
        const vehiculo = await prisma.vehiculo.update({
            where: { placa },
            data: {
                modelo: modelo || undefined,
                marca: marca || undefined,
                color: color || undefined,
                atributo: atributo || undefined,
            },
        });

        res.json({
            "message": `Vehículo con placa ${placa} actualizado exitosamente`,
            "updatedVehicle": vehiculo
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                "message": `Vehículo con placa ${placa} no encontrado`
            });
        }
        res.status(500).json({
            "message": "Error al actualizar el vehículo",
            "error": error.message
        });
    }
};

// Elimina un vehículo por su placa
const DeleteVehicle = async (req = request, res = response) => {
    const { placa } = req.params;

    try {
        await prisma.vehiculo.delete({
            where: { placa },
        });

        res.json({
            "message": `Vehículo con placa ${placa} eliminado exitosamente`
        });
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({
                "message": `Vehículo con placa ${placa} no encontrado`
            });
        }
        res.status(500).json({
            "message": "Error al eliminar el vehículo",
            "error": error.message
        });
    }
};

module.exports = {
    ShowVehicles,
    AddVehicle,
    ShowVehicle,
    EditVehicle,
    DeleteVehicle
};
