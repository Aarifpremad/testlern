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

router.route("/userlist").get((req, res) => {
    res.render("userlist", { title: "User Management", page: "users" });
});

router.get('/adminprofile', async (req, res) => {
    let admin =await Model.SuperAdmin.findOne();
    console.log(admin,"admin")
    res.render('profile', { title: 'profile', page: 'profile' ,admin : admin});
});


router.route("/category").get((req, res) => {
    res.render("category", { title: "category Management", page: "category" });
});
router.route("/subcategory").get((req, res) => {
    res.render("subcategory", { title: "category Management", page: "category" });
});

router.route("/subcategorylist").get((req, res) => {
    res.render("subcategorylist", { title: "subcategorylist Management", page: "subcategorylist" });
});

router.route("/categorylist").get((req, res) => {
    res.render("categorylist", { title: "categorylist Management", page: "categorylist" });
});

router.route("/product").get((req, res) => {
    res.render("product", { title: "categorylist Management", page: "categorylist" });
});


router.route("/specifications/color").get((req, res) => {
    res.render("specscolor", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/size").get((req, res) => {
    res.render("specssize", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/finish").get((req, res) => {
    res.render("specsfinish", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/material").get((req, res) => {
    res.render("specsmaterial", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/thickness").get((req, res) => {
    res.render("specsthickness", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/room").get((req, res) => {
    res.render("specsroom", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/type").get((req, res) => {
    res.render("specstype", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/print").get((req, res) => {
    res.render("specsprint", { title: "categorylist Management", page: "categorylist" });
});
router.route("/specifications/usage").get((req, res) => {
    res.render("specsusage", { title: "categorylist Management", page: "categorylist" });
});

router.route("/productgroup").get((req, res) => {
    res.render("productgroup", { title: "categorylist Management", page: "categorylist" });
});
router.route("/brand").get((req, res) => {
    res.render("brand", { title: "categorylist Management", page: "categorylist" });
});

router.route("/unit").get((req, res) => {
    res.render("unit", { title: "categorylist Management", page: "categorylist" });
});

router.route("/productlist").get((req, res) => {
    res.render("productlist", { title: "categorylist Management", page: "categorylist" });
});
router.route("/page").get((req, res) => {
    res.render("pages", { title: "categorylist Management", page: "categorylist" });
});
router.route("/banners").get((req, res) => {
    res.render("banners", { title: "categorylist Management", page: "categorylist" });
});

router.route("/header").get((req, res) => {
    res.render("header", { title: "header Management", pages: [] });
});
router.route("/aboutdelivery").get((req, res) => {
    res.render("aboutdelivery", { title: "header Management", pages: [] });
});
router.route("/offersforuser").get((req, res) => {
    res.render("offer", { title: "header Management", pages: [] });
});

router.route("/slidbar").get((req, res) => {
    res.render("slidbar", { title: "header Management", pages: [] });
});

router.route("/imagesforuser").get((req, res) => {
    res.render("imagesforusers", { title: "header Management", pages: [] });
});

router.route("/websitepopup").get((req, res) => {
    res.render("websitepopup", { title: "header Management", pages: [] });
});

router.route("/coupens").get((req, res) => {
    res.render("coupens", { title: "header Management", pages: [] });
});


router.route("/admin/users").get((req, res) => {
    res.render("userlist", { title: "header Management", pages: [] });
});

router.route("/admin/users").get((req, res) => {
    res.render("userdetails", { title: "header Management", pages: [] });
});


router.route("/allorders").get((req, res) => {
    res.render("order", { title: "header Management", pages: [] });
});



router.get('/user-details/:id', async (req, res) => {
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
        console.log({ order: OrderDetils }); // Ensure order_status exists
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
