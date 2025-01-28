const Category = require('../models/category.model');
const path = require('path');

const uploadCategoryImages = (req) => {
    const uniqueFiles = (files) =>
        files ? files.map(file => path.join('uploads', file.filename)) : [];

    const categoryImages = uniqueFiles(req.files['cimages']);
    const bannerImages = uniqueFiles(req.files['bimages']);

    return { categoryImages, bannerImages };
};

exports.createCategory = async (req, res) => {
    try {
        // Assuming uploadCategoryImages handles file uploads and returns URLs/paths
        const { categoryImages, bannerImages } = uploadCategoryImages(req);

        // Check if category name already exists
        const category = await Category.findOne({ name: req.body.name });
        if (category) {
            return res.status(400).json({ success: false , message: 'Category name already exists!' });
        }

        let id = await Category.findOne().sort({ id: -1 }).limit(1);
        if (id) {
            id = id.id + 1;
        } else {
            id = 1;
        }
        // Prepare new category data
        const newCategory = new Category({
            name: req.body.name,
            position: req.body.position,
            description: req.body.description,
            status: req.body.status === 'true',
            category_status: req.body.category_status === 'true',
            label: req.body.label,
            category_image: categoryImages,  // Ensure this is an array of image URLs or paths
            banner_image: bannerImages,     // Ensure this is an array of image URLs or paths
            seo: {
                meta_title: req.body['seo[meta_title]'] || '',
                meta_description: req.body['seo[meta_description]'] || '',
                meta_keywords: req.body['seo[meta_keywords]'] || '',
            },
            id : String(id)
        });

        await newCategory.save();

        res.status(200).json({
            success: true,
            message: 'Category created successfully!',
            category: {
                id: newCategory._id,  // Return only necessary info (e.g., category ID)
                name: newCategory.name,
                position: newCategory.position,
                description: newCategory.description,
                status: newCategory.status,
                category_status: newCategory.category_status,
                label: newCategory.label,
                seo: newCategory.seo
            }
        });

    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ message: 'An error occurred while creating the category.', error: error.message });
    }
};




exports.getCategories = async (req, res) => {
    try {
        const { page = 1, limit = 10, name = '', status, draw } = req.query;

        // Build filter object
        const filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (status !== undefined) {
            filter.status = status === 'true';
        }

        // Pagination and sorting logic
        const categories = await Category.aggregate([
            { $match: filter },
            {
                $lookup: {
                    from: 'products', // Collection name of products
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'products',
                },
            },
            {
                $addFields: {
                    productCount: { $size: '$products' }, // Count the number of products
                },
            },
            {
                $project: {
                    products: 0, // Exclude product details from response
                },
            },
        ])
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalCount = await Category.countDocuments(filter);

        // Send response in DataTable-friendly format
        res.status(200).json({
            draw: parseInt(draw) || 1, // Draw ID from request
            recordsTotal: totalCount, // Total number of records (for pagination)
            recordsFiltered: totalCount, // Total number of filtered records (same as total count in this case)
            data: categories, // Data for the table
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ message: 'An error occurred while fetching categories.' });
    }
};

