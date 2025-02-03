const express = require('express');
const router = express.Router();
const favoriteController = require('../apicontroller/favorite.controller');
let authenticate = require("../service/auth").authenticateUser

router.post('/favorites/add', authenticate ,favoriteController.addFavorite);


module.exports = router;
