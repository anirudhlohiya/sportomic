const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    booking_id: { type: Number, required: true, unique: true },
    venue_id: { type: Number, required: true, ref: 'Venue' }, // Reference to Venue
    sport_id: { type: Number, required: true },
    member_id: { type: Number, required: true, ref: 'Member' }, // Reference to Member
    booking_date: { type: Date, required: true },
    amount: { type: Number, required: true },
    coupon_code: { type: String },
    status: { 
        type: String, 
        enum: ['Confirmed', 'Completed', 'Cancelled'], // Status ENUMs
        required: true 
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Booking', bookingSchema);