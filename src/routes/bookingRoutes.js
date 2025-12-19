const express = require('express');
const {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking
} = require('../controllers/bookingController');

const router = express.Router();

// Route: Create a new booking
router.post('/', createBooking);

// Route: Get all bookings
router.get('/', getAllBookings);

// Route: Get a booking by ID
router.get('/:id', getBookingById);

// Route: Update a booking's status
router.put('/:id', updateBookingStatus);

// Route: Cancel (delete) a booking
router.delete('/:id', deleteBooking);

module.exports = router;