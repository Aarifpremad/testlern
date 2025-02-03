let express = require("express");
let router = express.Router();

let userroute = require("./apiroutes/user.route");
let catecontroller = require("./apiroutes/category.route");
let productrouter = require("./apiroutes/productrouter");
let webroute = require("./apiroutes/website.route");
let favorite = require("./apiroutes/favorite.router");
let cartroute = require("./apiroutes/cart.route");


router.use('/api', userroute);
router.use('/api', catecontroller);
router.use('/api', productrouter);
router.use('/api', favorite);
router.use('/api', cartroute);
router.use('/api', webroute);


module.exports = router;
