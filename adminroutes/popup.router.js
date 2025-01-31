const express = require('express');
const router = express.Router();
const PopupContent = require('../models/popup.model');

// Get current popup content API
router.get('/popup-content', async (req, res) => {
    try {
        const popupContent = await PopupContent.findOne();
        if (popupContent) {
            res.json(popupContent);
        } else {
            res.status(404).json({ message: 'Popup content not found.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving popup content.' });
    }
});

// Update or insert popup content API
router.put('/update-popup-content', async (req, res) => {
    const { lines, status } = req.body;
    
    try {
        const updatedContent = await PopupContent.findOneAndUpdate(
            {}, 
            { $set: { lines, status } },
            { new: true, upsert: true }
        );
        res.json(updatedContent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating popup content.' });
    }
});

module.exports = router;
