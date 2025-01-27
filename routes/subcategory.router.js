const express = require('express');
const multer = require('multer');
const path = require('path');
const { createSubCategory  ,getSubCategories } = require('../controller/subcategory.controller');
const Category = require('../models/category.model');
const SubCategory = require("../models/subcategory.model")
const Unit = require("../models/unit.model");
const Brand = require("../models/brand.model");
const ProductGroup = require("../models/productgroup.model");
const SpecsFinish = require("../models/specsfinish.model");
const SpecsMaterial = require("../models/specsmaterial.model");
const Color = require("../models/color.model");
const SpecsThickness = require("../models/model").specsthickness;
const SpecsRoom = require("../models/room.model");
const SpecsType = require("../models/specstype.model");
const SpecsPrint = require("../models/specsprint.model");
const SpecsUsage = require("../models/specesusage.model");
const SpecsSize = require("../models/specssize.model");

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
        const unit = await Unit.find();
        const brand = await Brand.find();
        const productGroup = await ProductGroup.find();
        const specsFinish = await SpecsFinish.find();
        const specsMaterial = await SpecsMaterial.find();
        const color = await Color.find();
        const specsThickness = await SpecsThickness.find();
        const specsRoom = await SpecsRoom.find();
        const specsType = await SpecsType.find();
        const specsPrint = await SpecsPrint.find();
        const specsUsage = await SpecsUsage.find();
        const specsSize = await SpecsSize.find();
        res.json({ success: true, categories, subCategories , unit , brand , group : productGroup , specsFinish , specsMaterial , color , specsThickness , specsRoom , specsType , specsPrint , specsUsage , size: specsSize });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: 'Error fetching categories.' });
    }
});

router.get('/subcategories', getSubCategories);  // Get categories with pagination, filtering, and sorting

module.exports = router;
