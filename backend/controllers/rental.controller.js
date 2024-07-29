// rental.controller.js
const rentalService = require('../service/rental.service');

class RentalController {
  async createRental(req, res) {
    try {
      const rental = await rentalService.createRental(req.body);
      res.status(201).json(rental);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllRentals(req, res) {
    try {
      const rentals = await rentalService.getAllRentals();
      res.status(200).json(rentals);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getRentalById(req, res) {
    try {
      const rental = await rentalService.getRentalById(req.params.id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateRental(req, res) {
    try {
      const rental = await rentalService.updateRental(req.params.id, req.body);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json(rental);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteRental(req, res) {
    try {
      const rental = await rentalService.deleteRental(req.params.id);
      if (!rental) {
        return res.status(404).json({ message: 'Rental not found' });
      }
      res.status(200).json({ message: 'Rental deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new RentalController();
