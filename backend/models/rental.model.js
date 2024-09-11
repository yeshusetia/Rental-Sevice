const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  itemStatus: {
    type: String,
    enum: ['RENT', 'SALE'], // Either RENT or SALE
    required: true
  },
  itemType: {
    type: String,
    enum: ['PROPERTY', 'VEHICLE', 'THING'], // Choose between PROPERTY, VEHICLE, or THING
    required: true
  },
  // Location field
  location: {
    type: String,
    required: true // Location is required
  },
  // Fields for RENT
  price: {
    type: Number,
    required: function () {
      return this.itemStatus === 'RENT'; // Rent price is required if itemStatus is 'RENT'
    }
  },
  rentDuration: {
    type: String,
    enum: ['DAY', 'MONTH', 'QUATERLY', 'SIX_MONTHS', 'YEARLY'], // Available durations
    required: function () {
      return this.itemStatus === 'RENT'; // Rent duration is required if itemStatus is 'RENT'
    }
  },
  // Fields for SALE
  sellingPrice: {
    type: Number,
    required: function () {
      return this.itemStatus === 'SALE'; // Selling price is required if itemStatus is 'SALE'
    }
  },

  // Categories based on itemType
  category: {
    type: String,
    enum: function () {
      if (this.itemType === 'PROPERTY') {
        return ['RESIDENTIAL', 'SPORT_VENUE', 'COMMERCIAL_SPACES'];
      } else if (this.itemType === 'VEHICLE') {
        return ['FOUR_WHEELER', 'TWO_WHEELER', 'BICYCLE'];
      } else if (this.itemType === 'THING') {
        return ['FURNITURE', 'ELECTRONICS', 'LAPTOPS', 'MOBILES'];
      }
      return null;
    },
    required: true // Category is required for all itemTypes
  },

  // Fields common to both SALE and RENT
  ownerName: {
    type: String,
    required: true // Required for both RENT and SALE
  },
  ownerMobileNumber: {
    type: String,
    required: true // Required for both RENT and SALE
  },
  // Field for storing a single base64 image string
  image: {
    type: String,
    required: true // Image is required and will store the base64 string
  },
  editorId: {
    type: mongoose.Schema.Types.ObjectId, // or String depending on your user ID type
    ref: 'User',  // Reference to the User model (assuming MongoDB/Mongoose)
    required: true,
  },
}, { timestamps: true });

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
