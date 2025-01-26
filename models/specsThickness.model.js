// models/SpecsThickness.js
const mongoose = require('mongoose');

const specsThicknessSchema = new mongoose.Schema(
    {
        thickness: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsThickness', specsThicknessSchema);
