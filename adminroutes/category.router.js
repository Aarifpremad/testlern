const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const categoryController = require('../admincontroller/category.controller');
let Model = require("../models/model")

// Create an express router
const router = express.Router();

// Set up Multer storage
const uploadDir = path.join(__dirname, '../uploads');

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB file size limit
});

router.post(
    '/create-category',
    upload.fields([
        { name: 'cimages', maxCount: undefined  }, 
        { name: 'bimages', maxCount: undefined  }, 
    ]),
    categoryController.createCategory
);

router.get('/categories', categoryController.getCategories);
router.get('/category/:id', categoryController.getCategoy); 
router.post('/update-category/:id',
    upload.fields([
        { name: 'cimages', maxCount: undefined  }, 
        { name: 'bimages', maxCount: undefined  }, 
    ]),
    categoryController.updtecategory
);  



    router.delete('/categories/delete/:categoryId', async (req, res) => {
        const { categoryId } = req.params;
    
        try {
            // Soft delete by updating status (set 'deleted' status or any other flag)
            const category = await Model.Category.findByIdAndDelete(categoryId);
    
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }
    
            res.json({ message: 'Category deleted successfully' });
        } catch (error) {
            console.error('Error deleting category:', error);
            res.status(500).json({ message: 'Failed to delete category' });
        }
    });


    const mongoose = require('mongoose');

    router.get('/categories/products/:categoryId', async (req, res) => {
        const { categoryId } = req.params;
        const { limit, page, search } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
    
        try {
            const query = {
                categories: { $in: [new mongoose.Types.ObjectId(categoryId)] },
            };
    
            if (search) {
                query.$text = { $search: search }; // Apply text search if needed
            }
    
            // Fetch the products with pagination
            const products = await Model.Product.find(query)
                .skip(skip)
                .limit(parseInt(limit))
                .exec();
    
            // Get total record count for pagination
            const totalRecords = await Model.Product.countDocuments(query);
    
            // If a search is applied, adjust the count of filtered records
            const filteredRecords = search ? 
                await Model.Product.countDocuments({ ...query, $text: { $search: search } }) :
                totalRecords;
    
            res.json({
                products,
                recordsTotal: totalRecords, // Total records in the database
                recordsFiltered: filteredRecords, // Filtered records based on query
            });
        } catch (error) {
            console.error('Error fetching products:', error);
            res.status(500).json({ message: 'Failed to fetch products' });
        }
    });
    


router.post('/categories/toggle-status/:id', async (req, res) => {
    try {
        const cate = await Model.Category.findById(req.params.id);
        cate.status = cate.status === true ? false : true;
        await cate.save();
        res.json({ message: `Category status updated to ${cate.status}` , cate });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
