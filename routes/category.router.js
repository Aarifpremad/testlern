const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const categoryController = require('../controller/category.controller');

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

// Route to handle category creation form submission
router.post(
    '/create-category',
    upload.fields([
        { name: 'cimages', maxCount: undefined  }, // Category images
        { name: 'bimages', maxCount: undefined  }, // Banner images
    ]),
    categoryController.createCategory
);

router.get('/categories', categoryController.getCategories);  // Get categories with pagination, filtering, and sorting


module.exports = router;
