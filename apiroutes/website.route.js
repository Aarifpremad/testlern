const express = require('express');
const router = express.Router();
const webcontroller = require('../apicontroller/website.controller'); 
const Model = require('../models/model');


router.get("/home",webcontroller.home);
router.get("/realimage",webcontroller.realimages);
router.get("/pages",webcontroller.page);
router.get("/header",webcontroller.header);

module.exports = router;
