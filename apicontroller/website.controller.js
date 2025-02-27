const mongoose = require('mongoose');
const Model = require('../models/model'),
Service = require('../service'),
localization = require('../service/localization');
const authenticateUserforproduct = require("../service/auth").authenticateUserforproduct;


module.exports = {

    home: async function (req, res, next) {
        try {

            const user = await authenticateUserforproduct(req);
            const userFavorites = user ? new Set(user.favorites.map(id => id.toString())) : new Set();
            
            const [aboutdelivery, banner, slidbar, header, popup, offers, toproducts, bestsellers] = await Promise.all([
                Model.AboutDelivery.find({}).populate("page_id"),
                Model.Banner.find({}),
                Model.Slidbar.find({}),
                Model.Header.find({}).populate("pageId"),
                Model.Popup.find({}),
                Model.Offer.find({}),
                Model.Product.find({}).sort({ createdAt: -1 }).skip(40).limit(10),
                Model.Product.find({}).sort({ createdAt: -1 }).skip(10).limit(10)
            ]);
    
            // Function to add isFavourite field in products
            const addFavoriteField = (products) => {
                return products.map(product => ({
                    ...product.toObject(), 
                    isFavourite: userFavorites.has(product._id.toString())
                }));
            };
    
            return res.status(200).json(
                Service.response(true, "Welcome! SignUp Successfully", {
                    aboutdelivery,
                    banner,
                    slidbar,
                    header,
                    popup,
                    offers,
                    toproduct: addFavoriteField(toproducts), // Add isFavourite in toproduct
                    bestseller: addFavoriteField(bestsellers) // Add isFavourite in bestseller
                })
            );
        } catch (error) {
            console.log(error);
            return res.status(500).json(
                Service.response(false, "Something went wrong", { error: error.message })
            );
        }
    },
    
    

    realimages : async function (req, res, next) {
        let imges =await Model.Imagesforuser.find({});
        return res.status(200).json(
            Service.response(true, "real images", imges));
    },
    header : async function (req, res, next) {
        let header =await Model.Header.find({}).populate("pageId")

        return res.status(200).json(
            Service.response(true, "get pages", header));
    },
    page : async function (req, res, next) {
        let {page} = req.query
        let pagedata =await Model.Page.find({pg_title :page});

        return res.status(200).json(
            Service.response(true, "get pages", pagedata));
    },
}