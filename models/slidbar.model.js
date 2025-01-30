const mongoose = require('mongoose');

const SlidbarSchema = new mongoose.Schema({
    s_name: { type: String, required: true },
    position: { type: Number, required: true },
    s_path: { type: String, required: true }, // Image path
    s_url: { type: String, required: true },
    isActive: { type: Boolean, default: true },
});

module.exports = mongoose.model('Slidbar', SlidbarSchema);