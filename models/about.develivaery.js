const mongoose = require('mongoose');

const AboutDeliverySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    position: { type: Number, required: true },
    page_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
    icon_image: { type: String, required: true }
}, { timestamps: true });

const AboutDelivery = mongoose.model('AboutDelivery', AboutDeliverySchema);
module.exports = AboutDelivery;
