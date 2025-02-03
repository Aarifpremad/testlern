const mongoose = require('mongoose');
const Model = require('../models/model');
const authenticateUserforproduct = require("../service/auth").authenticateUserforproduct;
Service = require('../service'),

module.exports = {
    getproduct: async (req, res) => {
        try {
            const { category, subCategory } = req.query;
            let filterConditions = {};

            // Filtering by category and subCategory
                    if (category) {
            const categoryIds = category.split(',').map((id) => new mongoose.Types.ObjectId(id));
            filterConditions.categories = { $in: categoryIds };
        }

        if (subCategory) {
            const subCategoryIds = subCategory.split(',').map((id) => new mongoose.Types.ObjectId(id));
            filterConditions.subCategories = { $in: subCategoryIds };
        }
        let fdd = await Model.Product.find(filterConditions)
        const user = await authenticateUserforproduct(req);
        const userFavorites = user ? new Set(user.favorites.map(id => id.toString())) : new Set();
        const products = await Model.Product.aggregate([
            { $match: filterConditions },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'categories',
                    foreignField: '_id',
                    as: 'categoryDetails'
                }
            },
            {
                $lookup: {
                    from: 'subcategories',
                    localField: 'subCategories',
                    foreignField: '_id',
                    as: 'subCategoryDetails'
                }
            },
            {
                $project: {
                    _id: 1, 
                    name: 1, 
                    brand: 1, 
                    price: 1, 
                    images: 1, 
                    status: 1,
                    description: 1, 
                    productType: 1, 
                    productLabel: 1, 
                    categories: 1, 
                    subCategories: 1, 
                    categoryDetails: 1,
                    subCategoryDetails: 1,
                    isFavourite: { $in: ["$_id", Array.from(userFavorites)] }
                }
            }
        ]);
            return res
             .status(200)
             .json(Service.response(true, "products",products));
                  
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },
};
