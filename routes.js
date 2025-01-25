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

module.exports = router;
