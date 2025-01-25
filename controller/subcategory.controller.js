const SubCategory = require('../models/subcategory.model');
const path = require('path');
const fs = require('fs');

exports.createSubCategory = async (req, res) => {
    try {
        const { name, category, description, position, meta_title, meta_description, meta_keywords } = req.body;

        // Validate image upload
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'Image is required.' });
        }

        const newSubCategory = new SubCategory({
            name,
            category,
            description,
            position,
            image: req.file.filename, // Save the image filename
            seo: {
                meta_title,
                meta_description,
                meta_keywords
            }
        });

        await newSubCategory.save();

        res.status(201).json({
            success: true,
            message: 'SubCategory created successfully!',
            subCategory: newSubCategory
        });
    } catch (error) {
        console.error('Error creating subcategory:', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the subcategory.' });
    }
};
