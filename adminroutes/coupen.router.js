const express = require('express');
const router = express.Router();
const Coupon = require('../models/coupen.model');

// Create Coupon
router.post('/coupons', async (req, res) => {
    try {
        const coupon = new Coupon(req.body);
        await coupon.save();
        res.status(201).json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get Coupons (DataTables API)
router.get('/coupons', async (req, res) => {
    try {
        let { draw, start, length, search, order, columns } = req.query;

        start = parseInt(start) || 0;
        length = parseInt(length) || 10;
        let searchValue = search?.value || "";
        
        let sortColumn = columns?.[order?.[0]?.column]?.data || "createdAt";
        let sortDirection = order?.[0]?.dir === "desc" ? -1 : 1;

        let query = {};
        if (searchValue) {
            query = {
                $or: [
                    { code: { $regex: searchValue, $options: "i" } },
                    { name: { $regex: searchValue, $options: "i" } },
                    { discount: { $regex: searchValue, $options: "i" } },
                ],
            };
        }

        const totalRecords = await Coupon.countDocuments();
        const filteredRecords = await Coupon.countDocuments(query);

        const coupons = await Coupon.find(query)
            .sort({ [sortColumn]: sortDirection })
            .skip(start)
            .limit(length);

        res.json({
            draw: draw ? parseInt(draw) : 0,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: coupons
        });
    } catch (error) {
        console.error("Error fetching coupons:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get Coupon by ID
router.get('/coupons/:id', async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (!coupon) return res.status(404).json({ error: 'Coupon not found' });
        res.json(coupon);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update Coupon
router.put('/coupons/:id', async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!coupon) return res.status(404).json({ error: 'Coupon not found' });
        res.json(coupon);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete Coupon
router.delete('/coupons/:id', async (req, res) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id);
        if (!coupon) return res.status(404).json({ error: 'Coupon not found' });
        res.json({ message: 'Coupon deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
