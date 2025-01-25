const e = require('express');
const express = require('express');
const router = express.Router();
const path = require('path');

const Model = require('../models/model');
let AdminPagesController = require('../controller/adminpage.controller');



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

router.route("/categorylist").get((req, res) => {
    res.render("categorylist", { title: "categorylist Management", page: "categorylist" });
});

router.route("/product").get((req, res) => {
    res.render("product", { title: "categorylist Management", page: "categorylist" });
});
module.exports = router;
