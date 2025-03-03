const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser
let  categorycontrollr = require("../apicontroller/category.controller")


router.post("/categories",  categorycontrollr.getcategroy);
router.post("/subcategories",  categorycontrollr.getsubcategroy);
router.post("/subcategories/:categoryslug",  categorycontrollr.getsubcategroybycate);

module.exports = router;
