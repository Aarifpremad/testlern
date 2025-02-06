const mongoose = require('mongoose');
const Model = require('../models/model'),
Service = require('../service'),
localization = require('../service/localization');


module.exports = {

    getcategroy: async (req, res) => {
        try {
            const categories = await Model.Category.find();
            return res
            .status(200)
            .json(Service.response(true, "successfully get category" , categories));
        } catch (error) {
            console.error(error);
            return res.status(200).json(Service.response(false, localization.ServerError, null));
        }
    },

    getsubcategroy: async (req, res) => {
        try {
            const categories = await Model.Subcategory.find();
            return res
            .status(200)
            .json(Service.response(true, "successfully get category" , categories));
        } catch (error) {
            console.error(error);
            return res.status(200).json(Service.response(false, localization.ServerError, null));
        }
    },

    getsubcategroybycate : async (req, res) => {
        try {
            const { categoryId } = req.params; // URL se categoryId extract karein
            
            const subcategories = await Model.Subcategory.find({ category: categoryId });
    
            return res
            .status(200)
            .json(Service.response(true, "subcategory BY Category" , subcategories));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    
}