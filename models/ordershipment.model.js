const mongoose = require('mongoose');


const shipmentSchema = new mongoose.Schema({
    order_no: { type: String, required: true },
    carrier_title :{ type: String, required: true },
    carrier_number :{ type: String, required: true },
    message : { type: String, required: true },
    rates : { type: String, required: true }
},
{ timestamps: true },
);

module.exports = mongoose.model('Shipment', shipmentSchema);
