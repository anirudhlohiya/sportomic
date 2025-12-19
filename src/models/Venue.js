const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
    venue_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    location: { type: String, required: true }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Venue', venueSchema);