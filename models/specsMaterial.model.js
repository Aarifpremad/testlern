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

const SpecsMaterial= mongoose.model('SpecsMaterial', specsMaterialSchema);
module.exports = SpecsMaterial;