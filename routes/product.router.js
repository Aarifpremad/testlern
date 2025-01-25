const express = require('express');
const multer = require('multer');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const SubCategory = require('../models/subcategory.model');

// Configure Multer for file uploads
let path = require("path");
let fs = require("fs")
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

const router = express.Router();

// Endpoint to fetch categories and subcategories
router.get('/categoriesselect', async (req, res) => {
  try {
    const categories = await Category.find();
    const subCategories = await SubCategory.find();
    res.json({ success: true, categories, subCategories });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching categories or subcategories.' });
  }
});

// Endpoint to fetch products for linking
router.get('/productsselect', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching products.' });
  }
});

// Endpoint to create a product
router.post('/create-product', upload.array('images'), async (req, res) => {
  try {
    const productData = {
      ...req.body,
      images: req.files.map(file => file.path) // Save file paths to DB
    };

    const product = new Product(productData);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating product.' });
  }
});

module.exports = router;
