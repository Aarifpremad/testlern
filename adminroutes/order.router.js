const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Shipment = require("../models/ordershipment.model")
router.get('/orders', async (req, res) => {
    try {
        let { start, length, status, startDate, endDate, sku, email, mobile } = req.query;
        let query = {};

        if (status) {
            query.order_status = status;
        }
        if (startDate && endDate) {
            query.order_date = { $gte: new Date(startDate), $lte: new Date(endDate) };
        }
        if (sku) {
            query['order_items.sku'] = { $regex: sku, $options: 'i' };
        }
        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }
        if (mobile) {
            query.telephone = { $regex: mobile, $options: 'i' };
        }

        const totalRecords = await Order.countDocuments();
        const filteredRecords = await Order.countDocuments(query);
        const orders = await Order.find(query)
            .populate('user', 'username')
            .sort({ order_date: -1 })
            .skip(parseInt(start))
            .limit(parseInt(length));

        res.json({
            draw: req.query.draw,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: orders
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.get('/shipment/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        let findorderno = await Order.findById(orderId)
        const shipments = await Shipment.find({ order_no: findorderno.orderno });
        if (shipments.length > 0) {
            res.json({ success: true, shipments :shipments, order:findorderno  });
        } else {
            res.json({ success: false, message: "No shipment found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

const validTransitions = {
    'Placed': ['Confirmed', 'Cancelled'],
    'Confirmed': ['Shipped', 'Cancelled'],
    'Shipped': ['Delivered' , 'Cancelled'],
    'Delivered': ['Cancelled'],
    'Cancelled': []
};

router.put('/orders/:id/status', async (req, res) => {
    try {
        const { status, admin_message } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        if (!validTransitions[order.order_status].includes(status)) {
            return res.status(400).json({ success: false, message: `Invalid status transition from ${order.order_status} to ${status}` });
        }

        order.status_history.push({ status, admin_message });
        order.order_status = status;
        await order.save();

        return res.json({ success: true, message: `Order status updated to ${status}`, order });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

router.post('/create-shipment', async (req, res) => {
    let orderid = req.body.orderId
    let findorder = await Order.findById(orderid)



    let createshipment = new Shipment({
        order_no : findorder.orderno,
        carrier_title : req.body.title,
        carrier_number : req.body.number,
        message : req.body.message,
        rates : req.body.rates,
    });

    const savedshipment = await createshipment.save();
    res.json({ success: true, message: "success fully create" });

});


module.exports = router;
