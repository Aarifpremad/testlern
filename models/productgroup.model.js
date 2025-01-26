// models/ProductGroup.js
const mongoose = require('mongoose');

const productGroupSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProductGroup', productGroupSchema);
