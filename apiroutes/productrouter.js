const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser
let  productcontroller = require("../apicontroller/productcontroller")






router.get("/getproducts", productcontroller.getproduct);

router.get("/getproduct/:id", productcontroller.getProductById);

module.exports = router;
