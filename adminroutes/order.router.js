const express = require('express');
const router = express.Router();
const Order = require('../models/order.model');
const Shipment = require("../models/ordershipment.model")
router.get('/orders', async (req, res) => {
    try {
        let { start, length, search } = req.query;
        let query = {};

        if (search.value) {
            query.$or = [
                { orderno: { $regex: search.value, $options: 'i' } },
                { email: { $regex: search.value, $options: 'i' } }
            ];
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
        const shipments = await Shipment.find({ order_id: orderId });

        if (shipments.length > 0) {
            res.json({ success: true, shipments });
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
    'Shipped': ['Delivered'],
    'Delivered': [],
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

module.exports = router;
