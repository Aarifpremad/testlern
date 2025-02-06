const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderno: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Guest users ke liye null
    email: { type: String, required: true },  // Required for guest checkout
    telephone: { type: String, required: true }, // Required for guest checkout
    order_date: { type: Date, default: Date.now },
    cart_total: Number,
    discount: Number,
    tax: Number,
    charges: Number,
    grand_total: Number,
    payment_mode: String,
    payment_status: String,
    order_status: { 
        type: String, 
        enum: ['Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'], 
        default: 'Placed' 
    },

    status_history: [{
        status: { type: String, enum: ['Placed', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'] },
        changed_at: { type: Date, default: Date.now },
        admin_message: {type:String,default:"Order Placed Successfully. "}
    }],

    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        product_price: Number,
        product_quantity: Number,
        total_amount: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
