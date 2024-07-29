// rental.model.js
const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
  available: { type: Boolean, default: true }
}, { timestamps: true });

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;