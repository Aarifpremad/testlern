let express = require("express");
let mongoose = require("mongoose");
let config = require("../config");
const specsthicknessModel = require("./specsthickness.model.js");
const AboutDelivery = require("./about.develivaery.js");
const Banner = require("./banner.model.js");
try {
    // DB Connect
    const dbConnection = mongoose.connect(
        `${config.db}`,
        {
            useNewUrlParser: true,
        }
    );

    dbConnection.then(() => {
        console.log("mongodb connected successfully ")
    }).catch((err) => {
        // logger.info('ERROR CONNECTING TO DB', err);
    });
    
} catch (err) {
    console.log('DBCONNECT ERROR', err);
}


module.exports = {
    User: require('./user.model.js'),
    UserOtp: require('./userotp.model.js'),
    SuperAdmin: require('./superadmin.js'),
    specsthickness : require("./specsthickness.model.js"),
    specsmaterial : require("./specsMaterial.model.js"),
    Category : require("./category.model.js"),
    Subcategory : require("./subcategory.model.js"),
    OTP : require("./otp.model.js"),
    Product : require("./product.model.js"),
    AboutDelivery : require("./about.develivaery.js"),
    Banner : require("./banner.model.js"),
    Brand :require("./brand.model.js"),
    Color :require("./color.model.js"),
    Coupen :require("./coupen.model.js"),
    Popup :require("./popup.model.js"),
    Header :require("./header.model.js"),
    Imagesforuser :require("./imagesforuser.model.js"),
    Offer :require("./offer.model.js"),
    Slidbar :require("./slidbar.model.js"),
    Room :require("./room.model.js"),
    Page: require("./page.model.js"),
    Cart : require("./cart.model.js"),
    Order : require("./order.model.js"),
    deliveryaddress : require("./orderdeliveryaddress.js"),
    Shipment : require("./ordershipment.model.js"),
    
}