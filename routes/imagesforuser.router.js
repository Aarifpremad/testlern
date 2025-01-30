const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ImageModel = require('../models/imagesforuser.model'); // Replace with your model

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Fetch images for users
router.get('/imagesforusers', async (req, res) => {
    try {
        const images = await ImageModel.find();
        res.json(images);
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message });
    }
});

// Add new image for users
router.post('/imagesforusers', upload.single('img_path'), async (req, res) => {
    const { img_title, img_desc, redirect_url, position, isActive } = req.body;
    const newImage = new ImageModel({
        img_title,
        img_desc,
        img_path: req.file.filename,
        redirect_url,
        position,
        isActive,
    });

    try {
        await newImage.save();
        res.status(201).json(newImage);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete image
router.delete('/imagesforusers/:id', async (req, res) => {
    try {
        await ImageModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;


