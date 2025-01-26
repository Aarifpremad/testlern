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
module.exports = router;
