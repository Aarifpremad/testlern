const express = require('express');
const router = express.Router();
const path = require('path');

const Model = require('../models/model');
let AdminPagesController = require('../admincontroller/adminpage.controller');



router.get('/admin/login', async (req, res) => {
    res.render('login', { title: 'Admin Login' });
});

router.get("/admin/dashboard", async (req, res) => {
    res.render("dashboard", { title: "Dashboard", page: "dashboard"  });
});

router.route("/admin/userlist").get((req, res) => {
    res.render("userlist", { title: "User Management", page: "users" });
});

router.get('/admin/profile', async (req, res) => {
    let admin =await Model.SuperAdmin.findOne();
    res.render('profile', { title: 'profile', page: 'profile' ,admin : admin});
});


router.route("/admin/category").get((req, res) => {
    res.render("category", { title: "category Management", page: "category" });
});
router.route("/admin/subcategory").get((req, res) => {
    res.render("subcategory", { title: "category Management", page: "category" });
});

router.route("/admin/subcategorylist").get((req, res) => {
    res.render("subcategorylist", { title: "subcategorylist Management", page: "subcategorylist" });
});

router.route("/admin/categorylist").get((req, res) => {
    res.render("categorylist", { title: "categorylist Management", page: "categorylist" });
});

router.route("/admin/product").get((req, res) => {
    res.render("product", { title: "categorylist Management", page: "categorylist" });
});


router.route("/admin/specifications/color").get((req, res) => {
    res.render("specscolor", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/size").get((req, res) => {
    res.render("specssize", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/finish").get((req, res) => {
    res.render("specsfinish", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/material").get((req, res) => {
    res.render("specsmaterial", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/thickness").get((req, res) => {
    res.render("specsthickness", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/room").get((req, res) => {
    res.render("specsroom", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/type").get((req, res) => {
    res.render("specstype", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/print").get((req, res) => {
    res.render("specsprint", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/specifications/usage").get((req, res) => {
    res.render("specsusage", { title: "categorylist Management", page: "categorylist" });
});

router.route("/admin/productgroups").get((req, res) => {
    res.render("productgroup", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/brands").get((req, res) => {
    res.render("brand", { title: "categorylist Management", page: "categorylist" });
});

router.route("/admin/units").get((req, res) => {
    res.render("unit", { title: "categorylist Management", page: "categorylist" });
});

router.route("/admin/productlist").get((req, res) => {
    res.render("productlist", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/page").get((req, res) => {
    res.render("pages", { title: "categorylist Management", page: "categorylist" });
});
router.route("/admin/bannersadd").get((req, res) => {
    res.render("banners", { title: "categorylist Management", page: "categorylist" });
});

router.route("/admin/header").get((req, res) => {
    res.render("header", { title: "header Management", pages: [] });
});
router.route("/admin/aboutdeliveries").get((req, res) => {
    res.render("aboutdelivery", { title: "header Management", pages: [] });
});
router.route("/admin/offersforuser").get((req, res) => {
    res.render("offer", { title: "header Management", pages: [] });
});

router.route("/admin/slidbars").get((req, res) => {
    res.render("slidbar", { title: "header Management", pages: [] });
});

router.route("/admin/imagesforuser").get((req, res) => {
    res.render("imagesforusers", { title: "header Management", pages: [] });
});

router.route("/admin/websitepopup").get((req, res) => {
    res.render("websitepopup", { title: "header Management", pages: [] });
});

router.route("/admin/coupens").get((req, res) => {
    res.render("coupens", { title: "header Management", pages: [] });
});


router.route("/admin/users").get((req, res) => {
    res.render("userlist", { title: "header Management", pages: [] });
});

router.route("/admin/users").get((req, res) => {
    res.render("userdetails", { title: "header Management", pages: [] });
});

router.get('/admin/categories/view/:categoryId', async (req, res) => {
    const { categoryId } = req.params;

    try {
        // Fetch the category from the database using the categoryId
        const category = await Model.Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Render the categoryview.ejs with the category data
        res.render('categoryview', {
            category, // This will make the category data accessible in the template
            pageTitle: 'Category Details',
            image : "/"+category.category_image[0]
        });
    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).json({ message: 'Failed to load category details' });
    }
});

router.get('/admin/subcategories/view/:subcategoryId', async (req, res) => {
    const { subcategoryId } = req.params;

    try {
        // Fetch the category from the database using the categoryId
        const subcategory = await Model.Subcategory.findById(subcategoryId);

        if (!subcategory) {
            return res.status(404).json({ message: 'subcategory not found' });
        }

        // Render the categoryview.ejs with the category data
        res.render('subcategoryview', {
            subcategory, // This will make the category data accessible in the template
            pageTitle: 'SubCategory Details',
            image : "/"+subcategory.image
        });

    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).json({ message: 'Failed to load category details' });
    }
});

router.get('/admin/product/view/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        // Fetch the category from the database using the categoryId
        const product = await Model.Product.findById(productId).populate('categories', 'name').populate('subCategories','name' ).populate('linkedProducts','name');

        if (!product) {
            return res.status(404).json({ message: 'product not found' });
        }

        // Render the categoryview.ejs with the category data
        // console.log(subcategory.image)
        res.render('productview', {
            product, // This will make the category data accessible in the template
            pageTitle: 'product Details',
            image : "/"
        });
    } catch (error) {
        console.error('Error fetching category details:', error);
        res.status(500).json({ message: 'Failed to load category details' });
    }
});


router.route("/admin/allorders").get((req, res) => {
    res.render("order", { title: "header Management", pages: [] });
});



router.get('/admin/user-details/:id', async (req, res) => {
    try {
        const user = await Model.User.findById(req.params.id);
        res.render('userdetails', { user });
    } catch (error) {
        res.status(500).send('Error loading user details');
    }
});


router.get('/admin/orders/:id', async (req, res) => {
    try {
        const OrderDetils = await Model.Order.findById(req.params.id)
                            .populate('items.product_id') // Populate product_id directly in items array
                            .exec()
        const Address = await Model.OrderAddress.find({orderid:req.params.id});
        const orderproduct = OrderDetils.items
        
        res.render('orderdetils', {OrderDetils , Address,orderproduct});
    } catch (error) {
        console.log(error)
        res.status(500).send('Error loading user details');
    }
});

router.get('/admin/orders/track/:id', async (req, res) => {
    try {
        const OrderDetils = await Model.Order.findById(req.params.id)
        if (!OrderDetils) {
            return res.status(404).send('Order not found');
        }
        res.render('ordertrack', { order: OrderDetils });
    } catch (error) {
        console.log(error)
        res.status(500).send('Error loading order details');
    }
});



module.exports = router;
