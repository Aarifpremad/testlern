// models/SpecsMaterial.js
const mongoose = require('mongoose');

const specsMaterialSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsMaterial', specsMaterialSchema);
