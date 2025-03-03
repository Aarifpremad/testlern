const express = require('express');
const router = express.Router();
const webcontroller = require('../apicontroller/website.controller'); 
const Model = require('../models/model');


router.post("/home",webcontroller.home);
router.post("/realimage",webcontroller.realimages);
router.post("/pages/:page",webcontroller.page);
router.post("/header",webcontroller.header);

module.exports = router;
