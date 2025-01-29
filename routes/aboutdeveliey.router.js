const express = require('express');
const router = express.Router();
const AboutDelivery = require('../models/about.develivaery');
const TechPage = require('../models/page.model');

// Get paginated list of About Delivery items
router.get('/aboutDelivery', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;

        const aboutDeliveries = await AboutDelivery.find()
            .populate('page_id', 'pg_title')
            .skip(skip)
            .limit(parseInt(limit));

        const total = await AboutDelivery.countDocuments();
        res.json({ aboutDeliveries, total });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

// Get pages list
router.get('/aboutDelivery/pages', async (req, res) => {
    try {
        const pages = await TechPage.find({}, '_id pg_title');
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pages' });
    }
});

// Add a new About Delivery item
router.post('/aboutDelivery', async (req, res) => {
    try {
        const { title, description, position, page_id, icon_image } = req.body;

        const newItem = new AboutDelivery({
            title,
            description,
            position,
            page_id,
            icon_image
        });

        await newItem.save();
        res.json({ message: 'About Delivery item added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add item' });
    }
});

// Delete an About Delivery item
router.delete('/aboutDelivery/:id', async (req, res) => {
    try {
        await AboutDelivery.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete item' });
    }
});

module.exports = router;
