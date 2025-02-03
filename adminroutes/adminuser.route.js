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
            .select('numeric_id firstname lastname mobileno balance createdAt email status');

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



module.exports = router;
