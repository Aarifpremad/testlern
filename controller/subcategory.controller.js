const SubCategory = require('../models/subcategory.model');
const Product = require("../models/product.model")
const path = require('path');
const fs = require('fs');

exports.createSubCategory = async (req, res) => {
    try {
        const { name, category, description, position, meta_title, meta_description, meta_keywords ,status } = req.body;

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
            },
            status
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


// SubCategory Controller


exports.getSubCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, name = '', category } = req.query;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i' }; // Search by name
        if (category) filter.category = category;

        // Fetch subcategories with pagination and category name
        const subCategories = await SubCategory.find(filter)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .populate('category', 'name') // Populate category name
            .sort({ position: 1 })
            .lean();

        const totalCount = await SubCategory.countDocuments(filter);

        // Aggregate product counts for subcategories
        const subCategoryIds = subCategories.map((subCategory) => subCategory._id);

        const productCounts = await Product.aggregate([
            { $match: { subCategories: { $in: subCategoryIds } } }, // Match products in the subcategories
            { $unwind: '$subCategories' }, // Flatten subCategories array
            { $match: { subCategories: { $in: subCategoryIds } } }, // Match again to filter by subCategoryIds
            {
                $group: {
                    _id: '$subCategories', // Group by subCategory
                    count: { $sum: 1 }, // Count products
                },
            },
        ]);

        // Map product counts to subcategories
        const productCountMap = productCounts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});

        const subCategoriesWithProductCount = subCategories.map((subCategory) => ({
            ...subCategory,
            productCount: productCountMap[subCategory._id] || 0, // Default to 0 if no products
        }));

        res.status(200).json({
            subCategories: subCategoriesWithProductCount,
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            currentPage: parseInt(page),
        });
    } catch (error) {
        console.error('Error fetching subcategories:', error);
        res.status(500).json({ message: 'An error occurred while fetching subcategories.' });
    }
};
