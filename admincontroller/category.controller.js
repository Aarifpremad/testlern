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
                meta_title: req.body.meta_title || '',
                meta_description: req.body.meta_description || '',
                meta_keywords: req.body.meta_keywords || '',
            },
            id : String(id),
            heading :req.body.heading,
            content :req.body.content,

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


exports.getCategoy = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        res.json({ success: true, category });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.updtecategory = async (req, res) => {
    try {
        const { categoryImages, bannerImages } = uploadCategoryImages(req);



        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found!' });

        const exitcategory = await Category.findOne({ name: req.body.name });

        if (exitcategory && exitcategory._id.toString() !== req.params.id) {
            return res.status(400).json({ success: false , message: 'Category name already exists!' });
        }

        category.name = req.body.name;
        category.position = req.body.position;
        category.description = req.body.description;
        category.status = req.body.status === 'true';
        category.category_image = categoryImages.length ? categoryImages : category.category_image;
        category.banner_image = bannerImages.length ? bannerImages : category.banner_image;

        category.seo = {
            meta_title: req.body.meta_title || category.seo.meta_title,
            meta_description: req.body.meta_description || category.seo.meta_description,
            meta_keywords: req.body.meta_keywords || category.seo.meta_keywords,
        };
        category.heading = req.body.heading || category.heading;
        category.content = req.body.content || category.content;
        category.label = req.body.label || category.label;

        await category.save();
        res.status(200).json({ success: true, message: 'Category updated successfully!', category });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, message: 'Error updating category', error: error.message });
    }
};
