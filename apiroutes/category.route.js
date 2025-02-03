const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser
let  categorycontrollr = require("../apicontroller/category.controller")


router.get("/categories",  categorycontrollr.getcategroy);
router.get("/subcategories",  categorycontrollr.getsubcategroy);
router.get("/subcategories/:categoryId",  categorycontrollr.getsubcategroybycate);

module.exports = router;
