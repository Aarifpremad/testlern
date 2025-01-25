const express = require('express');
const multer = require('multer');
const path = require('path');
const { createSubCategory } = require('../controller/subcategory.controller');
const Category = require('../models/category.model');
const SubCategory = require("../models/subcategory.model")

const router = express.Router();

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Path where images will be stored
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Rename uploaded files
    }
});

const upload = multer({ storage });

// Subcategory creation route with image upload
router.post('/create-subcategory', upload.single('image'), createSubCategory);

// Fetch categories for selection
router.get('/categoriesselect', async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        res.json({ success: true, categories, subCategories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories.' });
    }
});

module.exports = router;
