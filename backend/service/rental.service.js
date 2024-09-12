// rental.service.js
const Rental = require('../models/rental.model');

class RentalService {
  async createRental(data) {
    const rental = new Rental(data);
    return await rental.save();
  }

  async getAllRentals(itemType, location) {
    const query = { itemType }; // Initialize the query with the itemType

    if (location !== 'ALL') {
      query.location = location;
    }

    const rentals = await Rental.find(query); // Query the database with the constructed query
  
    return rentals;
  }

  async getRentalById(id) {
    return await Rental.findById(id);
  }

  async updateRental(id, data) {
    return await Rental.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteRental(id) {
    return await Rental.findByIdAndDelete(id);
  }
  
}



module.exports = new RentalService();
