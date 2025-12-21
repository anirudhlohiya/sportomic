const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the MongoDB connection logic
const cors = require('cors');


// Import routes
const venueRoutes = require('./routes/venueRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const memberRoutes = require('./routes/memberRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the connectDB function
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON data
app.use(cors()); // Enable CORS for all routes

// Health check route
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Sportomic Backend API is running...',
        status: 'OK',
        timestamp: new Date().toISOString()
    });
});

// Mount API Endpoints
app.use('/api/venues', venueRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});