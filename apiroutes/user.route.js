'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser
// Register route
router.post('/register', userController.register);

// Login route
router.post('/login', userController.login);

router.get("/profile",authenticate, function (req, res, next) {
    return userController.profile(req, res, next);
  });

  router.post("/forgetpassword", function (req, res, next) {
    return UserController.forgetpassword(req, res, next);
  });
  router.post("/resetpassword", function (req, res, next) {
    return UserController.resetpassword(req, res, next);
  });
  router.post("/sendotp", function (req, res, next) {
    return UserController.sendotp(req, res, next);
  });
  router.post("/verifyotp", function (req, res, next) {
    return UserController.verifyotp(req, res, next);
  });
  router.post("/deleteAccount", function (req, res, next) {
    return UserController.deleteAccount(req, res, next);
  });

module.exports = router;
