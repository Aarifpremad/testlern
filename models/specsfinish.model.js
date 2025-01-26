// models/SpecsFinish.js
const mongoose = require('mongoose');

const specsFinishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsFinish', specsFinishSchema);
