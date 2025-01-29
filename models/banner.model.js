const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema({
    b_name: { type: String, },
    b_path: { type: String, },
    b_url: { type: String, },
    position: { type: Number, },
    isActive: { type: Boolean, }
});

const Banner = mongoose.model('Banner', BannerSchema);
module.exports = Banner;
