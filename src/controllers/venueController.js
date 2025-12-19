const Venue = require('../models/Venue');

// Add one or multiple venues to the database
const addVenues = async (req, res) => {
    try {
        // Check if body is an array for batch insert
        if (!Array.isArray(req.body)) {
            return res.status(400).json({ message: "Request body must be an array of venues" });
        }

        // Use insertMany to batch insert venues
        const venues = await Venue.insertMany(req.body);
        res.status(201).json(venues);
    } catch (error) {
        res.status(500).json({ message: 'Error adding venues', error });
    }
};

// Existing venue controller methods
const getAllVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        res.status(200).json(venues);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching venues', error });
    }
};

const getVenueById = async (req, res) => {
    try {
        const venue = await Venue.findOne({ venue_id: req.params.id });
        if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
        }
        res.status(200).json(venue);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching venue', error });
    }
};

module.exports = { getAllVenues, getVenueById, addVenues };