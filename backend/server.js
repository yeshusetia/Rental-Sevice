const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupSwagger = require('./swagger'); // Import Swagger setup
const rentalRoutes = require('./routes/rental.routes'); // Import rental routes

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rental-service', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Setup Swagger
setupSwagger(app);

// Rental Routes
app.use('/api/rentals', rentalRoutes);

// Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
