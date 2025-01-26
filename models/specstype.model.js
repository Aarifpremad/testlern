// models/SpecsType.js
const mongoose = require('mongoose');

const specsTypeSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsType', specsTypeSchema);
