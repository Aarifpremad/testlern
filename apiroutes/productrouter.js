const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser
let  productcontroller = require("../apicontroller/productcontroller")






// router.get("/getproducts", productcontroller.getproduct);

router.post("/getproductdetils/:name", productcontroller.getProductById);

// get product by categroy & subcategory 
router.post("/getproducts/:name", productcontroller.getproductnew);



module.exports = router;
