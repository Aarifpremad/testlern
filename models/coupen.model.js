// models/Coupon.js
const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    discount: { type: Number, required: true },
    discount_per: { type: Boolean, default: false },
    min_cart: { type: Number, default: 0 },
    rule: { type: String, enum: ['fixed_amt', 'percentage'], required: true },
    rule_qty: { type: Number, default: 0 },
    min_buy_qty: { type: Number, default: 0 },
    count: { type: Number, required: true },
    usage_per: { type: Number, required: true },
    created_date: { type: Date, default: Date.now },
    exp_date: { type: Date, required: true },
    is_exp: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);

