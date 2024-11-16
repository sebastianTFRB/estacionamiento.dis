const { Router } = require('express');
const { ShowVehicles, AddVehicle, ShowVehicle, EditVehicle, DeleteVehicle, UpdateFicha} = require('../controllers/vehicles.controller');

const router = Router();

// Rutas para vehículos
router.get('/', ShowVehicles);       // Mostrar todos los vehículos
router.post('/', AddVehicle);        // Agregar un nuevo vehículo
router.get('/:placa', ShowVehicle);  // Mostrar un vehículo por su placa
router.put('/:placa', EditVehicle);  // Editar un vehículo por su placa
router.delete('/:placa', DeleteVehicle); // Eliminar un vehículo por su placa
// Ruta para actualizar el estado de pago por placa
router.put('/actPago/:placa', UpdateFicha); // Actualizar estado de pago por placa

module.exports = router;
