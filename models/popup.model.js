const mongoose = require('mongoose');

// Popup Content Schema for dynamic lines and status
const popupContentSchema = new mongoose.Schema({
    lines: [
        {
            text: { type: String, required: true },
            status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
        }
    ],
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

// Create the PopupContent model
const PopupContent = mongoose.model('PopupContent', popupContentSchema);

module.exports = PopupContent;
