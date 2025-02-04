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

module.exports = router;
