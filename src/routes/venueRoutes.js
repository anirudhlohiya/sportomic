const express = require('express');
const { getAllVenues, getVenueById, addVenues } = require('../controllers/venueController');

const router = express.Router();

// Routes for Venues
router.get('/', getAllVenues);
router.get('/:id', getVenueById);
router.post('/', addVenues); // POST route to add venues

module.exports = router;