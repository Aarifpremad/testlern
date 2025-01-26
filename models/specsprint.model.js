// models/SpecsPrint.js
const mongoose = require('mongoose');

const specsPrintSchema = new mongoose.Schema(
    {
        print: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsPrint', specsPrintSchema);
