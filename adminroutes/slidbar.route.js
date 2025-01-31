// models/Slidbar.js


// routes/slidbar.js
const express = require('express');
const multer = require('multer');
const Slidbar = require('../models/slidbar.model');
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Get all slidbars
router.get('/slidbar', async (req, res) => {
    try {
        const slidbars = await Slidbar.find();
        res.json(slidbars);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch slidbars' });
    }
});

// Add a new slidbar
router.post('/slidbar', upload.single('s_path'), async (req, res) => {
    try {
        const { s_name, position, s_url, isActive, createdby } = req.body;
        const newSlidbar = new Slidbar({
            s_name,
            position,
            s_path: req.file.filename,
            s_url,
            isActive: isActive === '1',
            createdby
        });
        await newSlidbar.save();
        res.status(201).json({ message: 'Slidbar added successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to add slidbar' });
    }
});

// Delete a slidbar
router.delete('/slidbar/:id', async (req, res) => {
    try {
        await Slidbar.findByIdAndDelete(req.params.id);
        res.json({ message: 'Slidbar deleted successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Failed to delete slidbar' });
    }
});

module.exports = router;
