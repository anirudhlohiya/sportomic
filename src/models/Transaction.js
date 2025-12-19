const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transaction_id: { type: Number, required: true, unique: true },
    booking_id: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Booking', 'Coaching'] },
    amount: { type: Number, required: true },
    status: { type: String, required: true, enum: ['Success', 'Dispute', 'Refunded'] },
    transaction_date: { type: Date, required: true }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Transaction', transactionSchema);