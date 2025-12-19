const Booking = require('../models/Booking');

// Controller: Create a new booking
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Controller: Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

// Controller: Get a booking by ID
const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({ booking_id: req.params.id });
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

// Controller: Update a booking's status
const updateBookingStatus = async (req, res) => {
    try {
        const updatedBooking = await Booking.findOneAndUpdate(
            { booking_id: req.params.id },
            { status: req.body.status },
            { new: true } // Return the updated document
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

// Controller: Delete a booking
const deleteBooking = async (req, res) => {
    try {
        const deletedBooking = await Booking.findOneAndDelete({ booking_id: req.params.id });
        if (!deletedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Booking successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};

module.exports = {
    createBooking,
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking
};