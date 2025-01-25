const Model = require('../models/model');
const Service = require('../service');
const localization = require('../service/localization');
const multer = require('multer');
const fs = require('fs');
const path = require('path')






module.exports = {

    dashboard: async function (req, res) {
        res.render('dashboard', { 
            admin: users,
            host: "http://localhost:6019", 
            type: 'dashboard', 
            title: 'Admin Dashboard', 
            data, 
            host: req.hostname ,
            page: "dashboard"
        });
    }
    

}