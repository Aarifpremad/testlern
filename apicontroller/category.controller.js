const mongoose = require('mongoose');
const Model = require('../models/model'),
Service = require('../service'),
localization = require('../service/localization');


module.exports = {

    getcategroy: async (req, res) => {
        try {
            // const categories = await Model.Category.find();
            const categories = await Category.aggregate([
                {
                    $lookup: {
                        from: "subcategories", // This should match your MongoDB collection name
                        localField: "_id",
                        foreignField: "category",
                        as: "subCategories"
                    }
                },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        slug: 1, // Added slug
                        position: 1,
                        status: 1,
                        "subCategories._id": 1,
                        "subCategories.name": 1,
                        "subCategories.slug": 1, // Added slug for subcategories
                        "subCategories.status": 1
                    }
                }
            ]);
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
            const { slug } = req.params; // URL se categoryId extract karein
            
            const subcategories = await Model.Subcategory.find({ slug: slug });

            return res
            .status(200)
            .json(Service.response(true, "subcategory BY Category" , subcategories));
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            res.status(500).json({ success: false, message: "Server Error" });
        }
    },

    
}



// const slugify = require("slugify");

// const updateSlugs = async () => {
//     try {
//         // Update Categories
//         console.log("yes call slug update")
//         const categories = await Model.Category.find({ slug: { $exists: false } });
//         for (const category of categories) {
//             category.slug = slugify(category.name, { lower: true, strict: true });
//             await category.save();
//         }

//         // Update SubCategories
//         const subCategories = await Model.Subcategory.find({ slug: { $exists: false } });
//         for (const subCategory of subCategories) {
//             subCategory.slug = slugify(subCategory.name, { lower: true, strict: true });
//             await subCategory.save();
//         }

//         // Update Products
//         const products = await Model.Product.find({ slug: { $exists: false } });
//         for (const product of products) {
//             product.slug = slugify(product.name, { lower: true, strict: true });
//             await product.save();
//         }

//         console.log("Slug update completed!");
//     } catch (error) {
//         console.error("Error updating slugs:", error);
//     }
// };

// setTimeout(updateSlugs, 4000);
// updateSlugs();
