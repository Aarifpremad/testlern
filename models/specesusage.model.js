// models/SpecsUsage.js
const mongoose = require('mongoose');

const specsUsageSchema = new mongoose.Schema(
    {
        usage: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsUsage', specsUsageSchema);
