const { request, response } = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Mostrar todos los vehículos en el parqueadero
const ShowVehicles = async (req = request, res = response) => {
    try {
        const listaVehiculos = await prisma.vehiculo.findMany();
        res.json({
            "message": "Lista de vehículos",
            "vehicles": listaVehiculos
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al obtener los vehículos.",
            "error": error.message
        });
    }
};

// Mostrar un vehículo por su placa con su ficha asociada
const ShowVehicle = async (req, res) => {
    try {
    const { placa } = req.params;
    const vehiculo = await prisma.vehiculo.findUnique({
        where: { placa },
        include: { ficha: true },
    });
    if (!vehiculo) {
        return res.status(404).json({ message: "Vehículo no encontrado" });
    }
      // Función para formatear las fechas
    const formatearFecha = (fechaISO) => {
        if (!fechaISO) return null;  // Si no hay fecha, retornar null
        return new Date(fechaISO).toLocaleString('es-CO', {
        timeZone: 'America/Bogota',
        dateStyle: 'short',
        timeStyle: 'medium',
        });
    };
      // Verificar si el vehículo tiene ficha
    const vehiculoFormateado = {
        ...vehiculo,
        createdAt: formatearFecha(vehiculo.createdAt),
        updatedAt: formatearFecha(vehiculo.updatedAt),
        ficha: vehiculo.ficha ? {
        ...vehiculo.ficha,
        fechaEntrada: formatearFecha(vehiculo.ficha.fechaEntrada),
        fechaSalida: formatearFecha(vehiculo.ficha.fechaSalida),
        } : null,  // Si no tiene ficha, asignar null
    };
    return res.json(vehiculoFormateado);
    } catch (error) {
      console.error(error); // Verifica el error en la consola
    res.status(500).json({ message: "Error interno del servidor", error: error.message });
    }
};

const AddVehicle = async (req = request, res = response) => {
    const { placa, modelo, marca, color, tipo, atributo } = req.body;
    try {
        // Crear el vehículo sin verificar el espacio (ya no es necesario)
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
        // Crear la ficha sin necesidad de definir el estado de pago (se manejará implícitamente)
        const nuevaFicha = await prisma.ficha.create({
            data: {
                vehiculoId: nuevoVehiculo.id,
                fechaEntrada: new Date(),
                estadoPago: false, // Define el estado de pago aquí (puedes cambiarlo según tu lógica)
            },
        });
        res.json({
            "message": "Vehículo agregado al parqueadero y ficha creada.",
            "vehicle": nuevoVehiculo,
            "ficha": nuevaFicha
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al agregar el vehículo.",
            "error": error.message
        });
    }
};


const EditVehicle = async (req = request, res = response) => {
    const { placa } = req.params;  // Obtener la placa actual desde los parámetros de la URL
    const { nuevaPlaca, modelo, marca, color, tipo, atributo } = req.body; // Obtener la nueva placa y otros datos

    try {
        const vehiculoExistente = await prisma.vehiculo.findUnique({
            where: { placa },
        });

        if (!vehiculoExistente) {
            return res.status(404).json({
                "message": "Vehículo no encontrado"
            });
        }

        // Si se proporciona una nueva placa, actualízala en el vehículo
        const vehiculoActualizado = await prisma.vehiculo.update({
            where: { placa },
            data: {
                placa: nuevaPlaca,  // Actualizar la placa
                modelo,
                marca,
                color,
                tipo,
                atributo,
            },
        });

        res.json({
            "message": "Vehículo actualizado",
            "vehicle": vehiculoActualizado
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al actualizar el vehículo.",
            "error": error.message
        });
    }
};


// Eliminar un vehículo del parqueadero
const DeleteVehicle = async (req = request, res = response) => {
    const { placa } = req.params;

    try {
        const vehiculo = await prisma.vehiculo.findUnique({
            where: { placa },
        });

        if (!vehiculo) {
            return res.status(404).json({
                "message": "Vehículo no encontrado"
            });
        }

        // Eliminar el vehículo de la lista del parqueadero
        parqueadero.eliminarVehiculo(placa);

        await prisma.vehiculo.delete({
            where: { placa },
        });

        res.json({
            "message": `Vehículo con placa ${placa} eliminado del parqueadero.`
        });
    } catch (error) {
        res.status(500).json({
            "message": "Error al eliminar el vehículo.",
            "error": error.message
        });
    }
};

// Actualizar la ficha de un vehículo
const UpdateFicha = async (req = request, res = response) => {
    const { placa } = req.params; // Obtener la placa desde los parámetros de la URL
    const { estadoPago } = req.body; // Obtener el estado de pago desde el cuerpo de la solicitud

    try {
        // Validar que se recibe el estado de pago
        if (estadoPago === undefined) {
            return res.status(400).json({
                "message": "Se debe proporcionar el estado de pago."
            });
        }

        // Buscar el vehículo por placa (asegúrate de enviar la placa correctamente)
        const vehiculo = await prisma.vehiculo.findUnique({
            where: {
                placa: placa.trim() // Eliminar espacios adicionales
            },
        });

        // Verificar si el vehículo existe
        if (!vehiculo) {
            return res.status(404).json({
                "message": `Vehículo con placa ${placa} no encontrado.`
            });
        }

        // Buscar la ficha asociada al vehículo
        const ficha = await prisma.ficha.findUnique({
            where: {
                vehiculoId: vehiculo.id
            },
        });

        // Verificar si la ficha existe
        if (!ficha) {
            return res.status(404).json({
                "message": "Ficha no encontrada para este vehículo."
            });
        }

        // Actualizar la ficha con los nuevos datos
        const nuevaFechaSalida = estadoPago ? new Date() : ficha.fechaSalida;

        const fichaActualizada = await prisma.ficha.update({
            where: { id: ficha.id },
            data: {
                estadoPago: estadoPago,
                fechaSalida: nuevaFechaSalida,
            },
        });

        res.json({
            "message": `Ficha actualizada para el vehículo con placa ${placa}`,
            "ficha": fichaActualizada
        });

    } catch (error) {
        console.error("Error en la actualización de la ficha:", error);
        res.status(500).json({
            "message": "Error al actualizar la ficha.",
            "error": error.message
        });
    }
};



module.exports = {
    ShowVehicles,
    ShowVehicle,
    AddVehicle,
    EditVehicle,
    DeleteVehicle,
    UpdateFicha
};
