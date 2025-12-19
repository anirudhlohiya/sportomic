const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
    member_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    status: { 
        type: String, 
        enum: ['Active', 'Inactive'], 
        required: true 
    },
    is_trial_user: { type: Boolean, required: true },
    converted_from_trial: { type: Boolean, default: false },
    join_date: { type: Date, required: true }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Member', memberSchema);