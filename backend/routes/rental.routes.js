// rental.routes.js
const express = require('express');
const rentalController = require('../controllers/rental.controller');

const router = express.Router();


router.get('/health', rentalController.healthCheck); 
router.post('/', rentalController.createRental);
router.get('/', rentalController.getAllRentals);
router.get('/:id', rentalController.getRentalById);
router.put('/:id', rentalController.updateRental);
router.delete('/:id', rentalController.deleteRental);
router.post('/login', rentalController.login);
router.post('/register', rentalController.register);
router.post('/request-otp', rentalController.requestOtp);
router.post('/verify-otp', rentalController.verifyOtp);
router.post('/reset-password', rentalController.resetPassword);

module.exports = router;