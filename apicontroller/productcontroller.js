const mongoose = require('mongoose');
const Model = require('../models/model');
const authenticateUserforproduct = require("../service/auth").authenticateUserforproduct;
const Service = require('../service');
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

            return res.status(200).json(Service.response(true, "products", products));
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getProductById: async (req, res) => {
        try {
            const { name } = req.params;
            console.log(name)
            const product = await Model.Product.findOne({slug:name})
                .populate('categories')
                .populate('subCategories');

            if (!product) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }

            const user = await authenticateUserforproduct(req);
            const isFavourite = user ? user.favorites.includes(product._id.toString()) : false;

            return res.status(200).json(Service.response(true, "product", { ...product.toObject(), isFavourite }));
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    },

    getproductnew: async (req, res) => {
        try {
            let {name} = req.params;
            let filterConditions = {};

         // find subcate 
         let findsubcategory = await Model.Subcategory.findOne({ slug: { $regex: new RegExp(`^${name}$`, "i") } });

         if(findsubcategory){
            filterConditions.subCategories = { $in: [findsubcategory._id] }
         }else{
            let findcategory = await Model.Category.findOne({ slug: { $regex: new RegExp(`^${name}$`, "i") } });

            if(!findcategory){
                return res.status(200).json(Service.response(true, "products", []));
            }else{
                 filterConditions.categories = { $in: [findcategory._id] };
            }
         }

         console.log(filterConditions)

         const user = await authenticateUserforproduct(req);
         const userFavorites = user ? new Set(user.favorites.map(id => id.toString())) : new Set();
         const products = await Model.Product.aggregate([
             { $match: filterConditions },
            //  {
            //      $lookup: {
            //          from: 'categories',
            //          localField: 'categories',
            //          foreignField: '_id',
            //          as: 'categoryDetails'
            //      }
            //  },
            //  {
            //      $lookup: {
            //          from: 'subcategories',
            //          localField: 'subCategories',
            //          foreignField: '_id',
            //          as: 'subCategoryDetails'
            //      }
            //  },
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
                     slug:1,
                    //  categories: 1, 
                    //  subCategories: 1, 
                    //  categoryDetails: 1,
                    //  subCategoryDetails: 1,
                     isFavourite: { $in: ["$_id", Array.from(userFavorites)] }
                 }
             }
         ]);

         return res.status(200).json(Service.response(true, "products", products));

        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
};
