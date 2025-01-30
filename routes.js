let express = require("express");
let router = express.Router();

let adminpage = require("./routes/adminpage.router")
let adminrouter = require("./routes/adminrouter")

// Define adminroutes
router.use("/",adminpage)
router.use("/",adminrouter)

const categoryRoutes = require('./routes/category.router');

// Use category routes
router.use('/admin', categoryRoutes);

let subcategory = require("./routes/subcategory.router")

router.use("/admin",subcategory)


let product = require("./routes/product.router")

router.use("/admin",product)

// You can add more adminroutes here if needed

let specifications = require("./routes/specifications.router")

router.use("/admin",specifications)

let pages = require("./routes/page.router")

router.use("/admin",pages)

let header = require("./routes/header.route")

router.use("/admin",header)

const offerRoutes = require('./routes/offer.router');

router.use('/admin', offerRoutes);

const slidbarroute = require('./routes/slidbar.route');

router.use('/admin', slidbarroute);


const imageforuser = require('./routes/imagesforuser.router');

router.use('/admin', imageforuser);

const popuprouter = require('./routes/popup.router');

router.use('/admin', popuprouter);

const coupenrouter = require('./routes/coupen.router');

router.use('/admin', coupenrouter);

module.exports = router;
