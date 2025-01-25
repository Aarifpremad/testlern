const express = require('express');
const multer = require('multer');
const Product = require('../models/product.model');
const Category = require('../models/category.model');
const SubCategory = require('../models/subcategory.model');

// Modules
const fs = require('fs');
const path = require('path');

// Setup uploads directory
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer
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
    limits: { fileSize: 15 * 1024 * 1024 }, // 15MB
});

// Initialize Router
const router = express.Router();

// Fetch categories and subcategories
router.get('/categoriesselect', async (req, res) => {
    try {
        const categories = await Category.find();
        const subCategories = await SubCategory.find();
        res.json({ success: true, categories, subCategories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories and subcategories.' });
    }
});

// Fetch products
router.get('/productsselect', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products.' });
    }
});

// Create a new product
router.post('/create-product', upload.array('images'), async (req, res) => {
  try {
      const { body, files } = req;

      // Parse relatedProducts from the request body
      const relatedProducts = body.relatedProducts ? JSON.parse(body.relatedProducts) : [];

      const productData = {
          ...body,
          linkedProducts: {
              relatedProducts, // Add related product IDs
          },
          images: files.map(file => file.filename), // Store only file names
      };

      const product = new Product(productData);
      await product.save();

      res.status(201).json({ success: true, product, message: 'Product created successfully.' });
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'Error creating product.' });
  }
});


module.exports = router;
