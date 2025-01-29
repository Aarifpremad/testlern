const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    dynamic_section: String,
    content: String,
    extra: String,
    status: String,
    added_on: { type: Date, default: Date.now },
    modified_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Offer', offerSchema);