const mongoose = require('mongoose');


const shipmentSchema = new mongoose.Schema({
    order_no: { type: String, required: true },
    current_status: String,
    current_status_date_time: Date,
    previous_status: String,
    previous_status_date_time: Date,
    next_status: String,
    next_status_date_time: String,
    message: String
},
{ timestamps: true },
);

module.exports = mongoose.model('Shipment', shipmentSchema);
