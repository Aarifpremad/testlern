const jwt = require('jsonwebtoken');
const Model = require('../models/model'); // Adjust the path based on your folder structure

// main file to io import

const config = require('../config'); // Ensure to use your config setup
let Service = require("./index")
let localization = require("./localization")
/**
 * Authentication Middleware to verify the token.
 */
const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        console.log(token)

        if (!token) {
            return res.status(401).json(Service.response(false, "please provide token", null));
        }

        const decoded = jwt.verify(token, "config.tokensecret"); 
        const user = await Model.User.findById(decoded.id);

        if (!user) {
            return res.status(401).json(Service.response(false, localization.userNotFound, null));
        }
        req.user = user;
        next(); 
    } catch (error) {
      console.log(error)
        return res.status(401).json(Service.response(false, "invalidToken", null));
    }
};



let socketauth = (socket, next) => {
    const token = socket.handshake.query.token;
    if (!token) {
      return next(new Error('Authentication error'));
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        socket.emit('unauthorized', { message: 'Invalid token' });
        return;
      }
      socket.user = decoded;
      next();
    });
};


const authenticateSessionadmin = (req, res, next) => {
  if(!req.session){
    return res.redirect("/");
  }
  if (!req.session.admin) {
    return res.redirect("/"); 
  }
  res.locals.admin = req.session.admin; 
  next();
};


const authenticateUserforproduct = async (req) => {
  try {
      const token = req.headers.authorization?.split(' ')[1]; // Get token from headers
      if (!token) return null;
      
      const decoded = jwt.verify(token, 'config.tokensecret'); // Replace with actual secret key
      const user = await User.findById(decoded.id).select('favorites');
      return user;
  } catch (error) {
      return null;
  }
};

module.exports = {authenticateUser, socketauth , authenticateSessionadmin,authenticateUserforproduct};
