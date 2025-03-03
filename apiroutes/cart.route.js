const express = require('express');
const router = express.Router();
const cartController = require('../apicontroller/cart.controller');

let authenticate = require("../service/auth").authenticateUser



router.post('/cart/add',authenticate, cartController.addToCart);

router.post('/cart', authenticate,cartController.getCart);

router.post('/cart/update',authenticate, cartController.updateCart);

router.post('/cart/remove',authenticate, cartController.removeFromCart);

router.post('/cart/clear',authenticate, cartController.clearCart);

module.exports = router;
