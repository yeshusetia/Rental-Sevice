// rental.routes.js
const express = require('express');
const rentalController = require('../controllers/rental.controller');

const router = express.Router();

router.post('/', rentalController.createRental);
router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.put('/:id', rentalController.updateRental);
router.delete('/:id', rentalController.deleteRental);

module.exports = router;