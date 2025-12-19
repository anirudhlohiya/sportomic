const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db'); // Import the MongoDB connection logic

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the connectDB function
connectDB();

// Initialize Express application
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON data

// Test route
app.get('/', (req, res) => {
    res.send('Sportomic Backend API is running...');
});

// Start the server
const PORT = process.env.PORT || 5000; // Use port from .env or default to 5000
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});