const express = require('express');
const mongoose = require('mongoose');
const {Order ,OrderAddress} = require('../models/model'); 
const router = express.Router();
const authenticateUserforproduct = require("../service/auth").authenticateUserforproduct;


// Function to check missing fields
const validateFields = (data, requiredFields, prefix = "") => {
    let missingFields = [];
    requiredFields.forEach(field => {
        console.log(field,"data[field]")
        console.log(data?.[field],"data[field]")
        if (!data?.[field] || data?.[field] === "") {
            missingFields.push(prefix + field);
        }
    });
    return missingFields;
};

router.post('/placeorder', async (req, res) => {
    try {
        const { orderDetails, billingAddress, deliveryAddress } = req.body;

        let missingFields = [];

        // Required fields for order details
        missingFields.push(...validateFields(orderDetails, [
            "email", "telephone", "cart_total", "discount", "tax", 
            "charges", "grand_total", "payment_mode", "items"
        ], "orderDetails."));

        // Required fields for billing address
        missingFields.push(...validateFields(billingAddress, [
            "email", "telephone", "firstname", "lastname", "postalcode", 
            "streetaddress", "towncity", "state", "country"
        ], "billingAddress."));

        // Required fields for delivery address
        missingFields.push(...validateFields(deliveryAddress, [
            "email", "telephone", "firstname", "lastname", "postalcode", 
            "streetaddress", "towncity", "state", "country"
        ], "deliveryAddress."));

        // Validate items array
        if (!orderDetails?.items || !Array.isArray(orderDetails.items) || orderDetails.items.length === 0) {
            missingFields.push("orderDetails.items");
        } else {
            orderDetails.items.forEach((item, index) => {
                missingFields.push(...validateFields(item, [
                    "product_id", "product_price", "product_quantity", "total_amount"
                ], `orderDetails.items[${index}].`));
            });
        }

        // If any required field is missing, return error response
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                missingFields: missingFields
            });
        }

        // Generate a unique order number
        const orderNo = `ORD-${Date.now()}`;

        // Create and save the order
        const newOrder = new Order({
            orderno: orderNo,
            user: orderDetails.user || null, // Guest users will have null user
            email: orderDetails.email,
            telephone: orderDetails.telephone,
            cart_total: orderDetails.cart_total,
            discount: orderDetails.discount,
            tax: orderDetails.tax,
            charges: orderDetails.charges,
            grand_total: orderDetails.grand_total,
            payment_mode: orderDetails.payment_mode,
            payment_status: "pending",
            order_status: "Placed",
            items: orderDetails.items.map(item => ({
                product_id: new mongoose.Types.ObjectId(item.product_id),
                product_price: item.product_price,
                product_quantity: item.product_quantity,
                total_amount: item.total_amount
            })),
            billing : billingAddress.telephone,
            delivery : deliveryAddress.telephone
        });

        const savedOrder = await newOrder.save();

        // Save billing address
        const newBillingAddress = new OrderAddress({
            addresstype: "billing",
            orderid: savedOrder._id,
            user: savedOrder.user,
            email: billingAddress.email,
            telephone: billingAddress.telephone,
            companyname: billingAddress.companyname,
            firstname: billingAddress.firstname,
            lastname: billingAddress.lastname,
            postalcode: billingAddress.postalcode,
            streetaddress: billingAddress.streetaddress,
            towncity: billingAddress.towncity,
            state: billingAddress.state,
            country: billingAddress.country,
            ordernotes: billingAddress.ordernotes
        });

        await newBillingAddress.save();

        // Save delivery address
        const newDeliveryAddress = new OrderAddress({
            addresstype: "delivery",
            orderid: savedOrder._id,
            user: savedOrder.user,
            email: deliveryAddress.email,
            telephone: deliveryAddress.telephone,
            companyname: deliveryAddress.companyname,
            firstname: deliveryAddress.firstname,
            lastname: deliveryAddress.lastname,
            postalcode: deliveryAddress.postalcode,
            streetaddress: deliveryAddress.streetaddress,
            towncity: deliveryAddress.towncity,
            state: deliveryAddress.state,
            country: deliveryAddress.country,
            ordernotes: deliveryAddress.ordernotes
        });

        await newDeliveryAddress.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order: savedOrder
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});




module.exports = router;


module.exports = router;
