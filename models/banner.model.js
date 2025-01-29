const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    b_name: { type: String, required: true },
    b_path: { type: String, required: true },
    b_url: { type: String, required: true },
    position: { type: Number, required: true },
    isActive: { type: Boolean, required: true }
});

const Banner = mongoose.model('Banner', BannerSchema);
module.exports = Banner;
