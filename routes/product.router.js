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
      
      const imageFilenames = files.map(file => file.filename);
        console.log(body.metaDescription.metaKeywords,body);
      const  linkedProducts = body.linkedProducts && body.linkedProducts.relatedProducts 
      ? body.linkedProducts.relatedProducts 
      : [];
        const tilesPerfection = {
          description: body.tdescription,
          appearance: Array.isArray(body.finish) ? body.finish.join(', ') : body.finish, // Convert array to comma-separated string
          material: Array.isArray(body.material) ? body.material.join(', ') : body.material,
          glaze: body.glaze,
          rectified: body.Rectified,
          color: Array.isArray(body.color) ? body.color.join(', ') : body.color,
          thickness: Array.isArray(body.thickness) ? body.thickness.join(', ') : body.thickness,
          recommendedRoom: Array.isArray(body.recommendedRoom) ? body.recommendedRoom.join(', ') : body.recommendedRoom,
          quantityPerSquareMeter: body.quantityPerSquareMeter,
          type: Array.isArray(body.type) ? body.type.join(', ') : body.type,
          print: Array.isArray(body.print) ? body.print.join(', ') : body.print,
          usage: Array.isArray(body.usage) ? body.usage.join(', ') : body.usage,
          sizeMM: body.sizeMM,
          boxQuantity: body.boxQuantity,
          wastage: body.wastage,
        };
          
      const productData = {
        name: body.name,
        brand: body.brand,
        sku: body.skuCode,
        urlKey: body.urlKey,
        size: body.size,
        group: body.group,
        productSerialNo: body.serialNo,
        unit: body.unit,
        description: body.description,
        metaDescription: {
          metaTitle: body.metaDescription.metaTitle,
          metaKeywords: body.metaDescription.metaKeywords.split(',').map(k => k.trim()),
          metaDescription: body.metaDescription.metaDescription,
        },
        price: {
          price: body.price.price,
          ourPrice: body.price.ourPrice,
          ourCutPrice: body.price.ourCutPrice,
          ourFullCutPrice: body.price.ourFullCutPrice,
        },
        tilesPerfection,
        images: imageFilenames,
        categories: body.categories ? body.categories: [],
        subCategories: body.subCategories ? body.subCategories : [],
        linkedProducts,
      };
  
      const product = new Product(productData);
      await product.save();
  
      res.status(201).json({ success: true, product, message: 'Product created successfully.' });
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ success: false, message: 'Error creating product.', error });
    }
  });



  router.get('/products', async (req, res) => {
    try {
        const { draw = 1, start = 0, length = 10, search = '' } = req.query;
      console.log(JSON.stringify(req.query))
        const page = Math.ceil(start / length) + 1; // 1-based page number
        const limit = parseInt(length);

        const query = {
            $or: [
                { name: new RegExp(search, 'i') },
                { sku: new RegExp(search, 'i') }
            ]
        };

        const products = await Product.find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        const totalRecords = await Product.countDocuments();
        const totalFilteredRecords = await Product.countDocuments(query);
        res.json({
            draw: parseInt(draw), // Draw ID from request
            recordsTotal: totalRecords, // Total number of records
            recordsFiltered: totalFilteredRecords, // Total number of filtered records
            data: products, // Actual data for the table
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


  






module.exports = router;
