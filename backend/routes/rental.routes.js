// rental.routes.js
const express = require('express');
const rentalController = require('../controllers/rental.controller');

const router = express.Router();

router.post('/', rentalController.createRental);
router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.put('/:id', rentalController.updateRental);
router.delete('/:id', rentalController.deleteRental);
router.post('/login', rentalController.login);
router.post('/register', rentalController.register);

module.exports = router;