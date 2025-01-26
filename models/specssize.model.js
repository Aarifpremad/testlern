// models/SpecsSize.js
const mongoose = require('mongoose');

const specsSizeSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsSize', specsSizeSchema);
