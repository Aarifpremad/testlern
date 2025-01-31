'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../apicontroller/user.controller'); 
let authenticate = require("../service/auth").authenticateUser


router.post('/register', userController.register);
router.post('/login', userController.login);

router.get("/profile",authenticate, function (req, res, next) {
    return userController.profile(req, res, next);
  });

  router.post("/forgetpassword", function (req, res, next) {
    return userController.forgetpassword(req, res, next);
  });
  router.post("/resetpassword", function (req, res, next) {
    return userController.resetpassword(req, res, next);
  });
  router.post("/sendotp", function (req, res, next) {
    return userController.sendotp(req, res, next);
  });
  router.post("/verifyotp", function (req, res, next) {
    return userController.verifyotp(req, res, next);
  });
  router.post("/deleteAccount",authenticate, function (req, res, next) {
    return userController.deleteAccount(req, res, next);
  });

module.exports = router;
