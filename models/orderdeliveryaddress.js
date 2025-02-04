const mongoose = require('mongoose');

const orderAddressSchema = new mongoose.Schema({
    orderid: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Order',
        required: true
    },
    addresstype:{
        type: String,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },     
    email: {
        type: String,
        required: true
    },
    companyname: {
        type: String,
        required: false
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    streetaddress: {
        type: String,
        required: true
    },
    towncity: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    ordernotes: {
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
},  {
    timestamps: true,
  }
);

const OrderAddress = mongoose.model('deliveryaddress', orderAddressSchema);

module.exports = OrderAddress;
