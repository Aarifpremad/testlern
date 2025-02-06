const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// ✅ Get users (for DataTable)
router.get('/userslist', async (req, res) => {
    try {
        let { start, length, search } = req.query;
        start = parseInt(start) || 0;
        length = parseInt(length) || 10;

        let query = { isdeleted: false };
        if (search) {
            query.$or = [
                { firstname: { $regex: search, $options: 'i' } },
                { lastname: { $regex: search, $options: 'i' } },
                { mobileno: { $regex: search, $options: 'i' } },
                { numeric_id: !isNaN(search) ? parseInt(search) : null }
            ];
        }

        const totalRecords = await User.countDocuments({ isdeleted: false });
        const filteredRecords = await User.countDocuments(query);

        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .skip(start)
            .limit(length)
            .select('numeric_id firstname lastname mobileno balance createdAt email status isactive');

        res.json({
            draw: req.query.draw || 1,
            recordsTotal: totalRecords,
            recordsFiltered: filteredRecords,
            data: users
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Fetch user details by ID
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle user status (Active/Inactive)
router.put('/users/toggle-status/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.isactive = user.isactive === true ? false : true;
        await user.save();
        res.json({ message: `User status updated to ${user.status}`, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Toggle user wallet freeze
router.put('/users/toggle-freeze/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.walletFrozen = !user.walletFrozen;
        await user.save();
        res.json({ message: `User wallet ${user.walletFrozen ? 'frozen' : 'unfrozen'}`, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fetch user order history with pagination and search
router.get('/users/orders/:id', async (req, res) => {
    try {
        const { limit, page, search, orderColumn, orderDir } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { type: { $regex: search, $options: 'i' } },
                { status: { $regex: search, $options: 'i' } }
            ];
        }

        const orders = await Order.find({ userId: req.params.id, ...query })
            .skip((page - 1) * limit)
            .limit(Number(limit))
            .sort({ [orderColumn]: orderDir });

        const totalRecords = await Order.countDocuments({ userId: req.params.id, ...query });
        res.json({
            orders,
            totalRecords,
            filteredRecords: totalRecords
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;
