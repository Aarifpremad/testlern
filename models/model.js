let express = require("express");
let mongoose = require("mongoose");
let config = require("../config")
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
    User: require('./user.js'),
    UserOtp: require('./userotp.model.js'),
    SuperAdmin: require('./superadmin.js'),
    // Category : require("./category.model.js"),
    // SubCategory : require("./subcategory.model.js"),
    // Product : require("./product.model.js"),
}