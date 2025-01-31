const Model = require('../models/model');
const Service = require('../service');
const localization = require('../service/localization');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const moment = require('moment'); 






module.exports = {

    login: async function (req, res) {
      try {
        
        const {email , password } = req.body;
        console.log(email , password,"password",req.body)
        if (!email ) {
          return res
            .status(200)
            .json(Service.response(0, localization.missingParamError, null));
        }

        var user = await Model.SuperAdmin.findOne({
          email:email
        });
          console.log(user,"user")
        // if (!user){
        //   return res
        //   .status(200)
        //   .json(Service.response(0, localization.invalidCredentials, null));
        // }
        let match = await user.authenticate(password);
        // if (!match) { 
        //       return res
        //         .status(400)
        //         .json(Service.response(0, localization.incorrectPassword, null));
        //     }
        
            const newToken = user.generateJWT();
  
            let loginuserstoken =await user.removeexpiretoken(user.token);
            user.token = loginuserstoken;
      
            if (user.loginAllowed >= loginuserstoken.length ) {
              user.token.push(newToken);
            }else {
              user.token.shift();
              user.token.push(newToken);
            }
        var rez = await user.save();
        req.session.admin = {
          id: rez._id,
          name: rez.name,
          email : rez.email
        };
        if (!rez)
          return res
            .status(200)
            .json(Service.response(0, localization.ServerError, null));
        return res
          .status(200)
          .json(Service.response(1, localization.loginSuccess, newToken));
      } catch (error) {
        console.log(error)
        return res
        .status(200)
        .json(Service.response(0, localization.invalidCredentials, null));
      }
    },
    dashboard :async (req, res) => {
      try {
        console.log("req.session.admin",req.session.admin)
          const currentDate = moment();
          const startOfDay = currentDate.clone().startOf('day'); 
          const endOfDay = currentDate.clone().endOf('day'); 
  
          const totalUsers = await Model.User.countDocuments({});
  
          const newUsers = await Model.User.countDocuments({
              createdAt: { $gte: startOfDay.toDate(), $lte: endOfDay.toDate() }
          });
  
          const monthlyUserStats = {
              labels: [],
              data: []
          };
  
          for (let i = 11; i >= 0; i--) {
              const monthStart = currentDate.clone().subtract(i, 'months').startOf('month');
              const monthEnd = currentDate.clone().subtract(i, 'months').endOf('month');
  
              const monthUsers = await Model.User.countDocuments({
                  createdAt: { $gte: monthStart.toDate(), $lte: monthEnd.toDate() }
              });
  
              monthlyUserStats.labels.push(monthStart.format('MMM'));
              monthlyUserStats.data.push(monthUsers);
          }
  
          const topUsers = await Model.User.find({})
              .sort({ createdAt: -1 }) 
              .limit(4)
              .select('username balance avatar'); 
  
          const data = {
              totalUsers,
              newUsers,
              monthlyUserStats,
              topUsers,
              totalRevenue :0,
              totalCommissions :0,
  
          };
          res.json(data);
      } catch (error) {
          console.error('something went wrong', error);
          res.status(500).json({ message: 'something went wrong' });
      }
  },


  getprofile: async (req, res) => {
    try {
        let admin = await Model.SuperAdmin.findById(req.session.admin.id);
        if (!admin) {
            return res.status(404).send("Admin not found");
        }
        res.render("admin", { admin: admin });  // Render profile page with admin data
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
},

updateprofile :  async (req, res) => {
    const { name, password, confirmPassword } = req.body;
    console.log(req.body)
    // Ensure the passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        // Find the admin using the admin id from the session
        let admin = await Model.SuperAdmin.findById(req.session.admin.id);
        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        // Update admin details
        admin.name = name;

        // If password is provided, hash it and update
        if (password) {
            admin.password = password;  // Password will be hashed in the pre-save hook
        }

        await admin.save(); // Save the updated admin details
        res.send("Profile updated successfully"); // Send success response
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
},

// Route for admin logout
logout: (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Logout failed");
        }
        res.redirect("/"); // Redirect to login page after logout
    });
}
}