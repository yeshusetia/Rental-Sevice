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
  location: {
    type: String,
    required: true // Location is required
  },
  price: {
    type: Number,
    required: function () {
      return this.itemStatus === 'RENT'; // Rent price is required if itemStatus is 'RENT'
    }
  },
  rentDuration: {
    type: String,
    enum: ['DAY', 'MONTH', 'QUARTERLY', 'SIX_MONTHS', 'YEARLY'], // Available durations
    required: function () {
      return this.itemStatus === 'RENT'; // Rent duration is required if itemStatus is 'RENT'
    }
  },
  sellingPrice: {
    type: Number,
    required: function () {
      return this.itemStatus === 'SALE'; // Selling price is required if itemStatus is 'SALE'
    }
  },

  category: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        const validCategories = {
          PROPERTY: ['RESIDENTIAL', 'SPORT_VENUE', 'COMMERCIAL_SPACES'],
          VEHICLE: ['FOUR_WHEELER', 'TWO_WHEELER', 'BICYCLE'],
          THING: ['FURNITURE', 'ELECTRONICS', 'LAPTOPS', 'MOBILES']
        };
        return validCategories[this.itemType]?.includes(value); // Check if category is valid for the given itemType
      },
      message: props => `${props.value} is not a valid category for ${props.path}.`
    }
  },

  ownerName: {
    type: String,
    required: true
  },
  ownerMobileNumber: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true // Image is required and will store the base64 string
  },
  editorId: {
    type: mongoose.Schema.Types.ObjectId, // or String depending on your user ID type
    ref: 'User', // Reference to the User model (assuming MongoDB/Mongoose)
    required: true,
  },
}, { timestamps: true });

const Rental = mongoose.model('Rental', rentalSchema);

module.exports = Rental;
