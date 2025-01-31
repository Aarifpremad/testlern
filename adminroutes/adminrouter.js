const express = require('express');
const router = express.Router();
const path = require('path');
let AdminController = require('../admincontroller/admin.controller');



router.post('/admin/login', async (req, res) => {
    await AdminController.login(req,res)
});

router.get('/admin/dashboarddetils', async (req, res) => {
    await AdminController.dashboard(req,res)
});

router.post('/admin/logout', async (req, res) => {
    await AdminController.logout(req,res)
});

router.post('/admin/updateprofile', async (req, res) => {
    await AdminController.updateprofile(req,res)
});

router.get('/admin/getprofile', async (req, res) => {
    await AdminController.getprofile(req,res)
});


module.exports = router;
