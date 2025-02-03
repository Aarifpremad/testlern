let express = require("express");
let router = express.Router();

let adminpage = require("./adminroutes/adminpage.router")
let adminrouter = require("./adminroutes/adminrouter")

// Define adminroutes
router.use("/",adminpage)
router.use("/",adminrouter)

const categoryRoutes = require('./adminroutes/category.router');

// Use category routes
router.use('/admin', categoryRoutes);

let subcategory = require("./adminroutes/subcategory.router")

router.use("/admin",subcategory)


let product = require("./adminroutes/product.router")

router.use("/admin",product)

// You can add more adminroutes here if needed

let specifications = require("./adminroutes/specifications.router")

router.use("/admin",specifications)

let pages = require("./adminroutes/page.router")

router.use("/admin",pages)

let header = require("./adminroutes/header.route")

router.use("/admin",header)

const offerRoutes = require('./adminroutes/offer.router');

router.use('/admin', offerRoutes);

const slidbarroute = require('./adminroutes/slidbar.route');

router.use('/admin', slidbarroute);


const imageforuser = require('./adminroutes/imagesforuser.router');

router.use('/admin', imageforuser);

const popuprouter = require('./adminroutes/popup.router');

router.use('/admin', popuprouter);

const coupenrouter = require('./adminroutes/coupen.router');

router.use('/admin', coupenrouter);

const userrouter = require('./adminroutes/adminuser.route');

router.use('/admin', userrouter);

module.exports = router;
