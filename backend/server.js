const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const setupSwagger = require('./swagger'); // Import Swagger setup
const rentalRoutes = require('./routes/rental.routes'); // Import rental routes
const app = express();
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ limit: '10mb', extended: true })); // Increase URL-encoded size limit
// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/rental-service', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Setup Swagger
setupSwagger(app);

// Rental Routes
app.use('/api/rentals', rentalRoutes);

// Start Server
app.get("/*", function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
