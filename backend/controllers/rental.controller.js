// rental.controller.js
const rentalService = require('../service/rental.service');
const userService = require('../service/user.service');
const User = require('../models/user.model'); 

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

   // Register a new user
  async register(req, res) {
    try {
      const { email, password, name, userType } = req.body;
      const user = await userService.register({ email, password, name, userType });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Login user
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.login(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}







module.exports = new RentalController();
