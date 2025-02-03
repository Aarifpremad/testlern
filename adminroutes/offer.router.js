const express = require('express');
const router = express.Router();
const Offer = require('../models/offer.model');





router.get('/offers', async (req, res) => {
    const { draw, start, length, search, dynamic_section, status } = req.query;
    const searchRegex = new RegExp(search.value, 'i');  // Case-insensitive search

    try {
        // Filter by dynamic_section and status if provided
        let query = {};
        if (dynamic_section) query.dynamic_section = dynamic_section;
        if (status) query.status = status;
        if (search.value) {
            query = {
                ...query,
                $or: [
                    { dynamic_section: searchRegex },
                    { content: searchRegex },
                    { extra: searchRegex }
                ]
            };
        }

        // Get total count for pagination
        const totalRecords = await Offer.countDocuments(query);

        // Get paginated offers
        const offers = await Offer.find(query)
            .skip(Number(start))
            .limit(Number(length));

        // Send back the response with total count, filtered data, and draw count
        res.json({
            draw: Number(draw),
            recordsTotal: totalRecords,
            recordsFiltered: totalRecords,
            data: offers
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint for creating or updating an offer
router.post('/offers', async (req, res) => {
    const { id, dynamic_section, content, extra, status } = req.body;

    try {
        let offer = await Offer.findOneAndUpdate({dynamic_section:dynamic_section},{ content, extra, status })
        
        res.json(offer);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Endpoint for deleting an offer
router.delete('/offers/:id', async (req, res) => {
    try {
        console.log(req.params)
        await Offer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Offer deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
