let express = require("express");
let router = express.Router();

let userroute = require("./apiroutes/user.route")

router.use('/api', userroute);


module.exports = router;
