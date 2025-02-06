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
        if (!user){
          return res
          .status(400)
          .json(Service.response(0, localization.invalidCredentials, null));
        }
        // let match = await user.authenticate(password);
        let match = password == user.password
        console.log(match)
        if (!match) { 
              return res
                .status(400)
                .json(Service.response(0, localization.incorrectPassword, null));
            }
        
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
        const currentDate = moment();
        const startOfDay = currentDate.clone().startOf('day').toDate();
        const endOfDay = currentDate.clone().endOf('day').toDate();

        // Fetch all required counts and statistics in parallel using `Promise.all()`
        const [
            totalUsers,
            totalCategories,
            totalSubcategories,
            totalProducts,
            totalOrders,
            todayOrders,
            totalSales,
            todaySales,
            newUsers,
            topUsers,
            newOrders,
        ] = await Promise.all([
            Model.User.countDocuments(),
            Model.Category.countDocuments(),
            Model.Subcategory.countDocuments(),
            Model.Product.countDocuments(),
            Model.Order.countDocuments(),
            Model.Order.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
            Model.Order.aggregate([{ $group: { _id: null, total: { $sum: "$grand_total" } } }]),
            Model.Order.aggregate([{ $match: { createdAt: { $gte: startOfDay, $lte: endOfDay } } }, { $group: { _id: null, total: { $sum: "$grand_total" } } }]),
            Model.User.countDocuments({ createdAt: { $gte: startOfDay, $lte: endOfDay } }),
            Model.User.find().sort({ createdAt: -1 }).limit(4).select('numeric_id firstname email'),
            Model.Order.find().sort({ createdAt: -1 }).limit(4).select('orderno email grand_total order_status')
        ]);

        // Calculate monthly user statistics
        // const monthlyUserStats = { labels: [], data: [] };
        // for (let i = 11; i >= 0; i--) {
        //     const monthStart = currentDate.clone().subtract(i, 'months').startOf('month').toDate();
        //     const monthEnd = currentDate.clone().subtract(i, 'months').endOf('month').toDate();
        //     const monthUsers = await Model.User.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
        //     monthlyUserStats.labels.push(currentDate.clone().subtract(i, 'months').format('MMM'));
        //     monthlyUserStats.data.push(monthUsers);
        // }


        const monthlyUserStats = { labels: [], data: [] };
        const monthlyOrderStats = { labels: [], data: [] };

        for (let i = 11; i >= 0; i--) {
            const monthStart = currentDate.clone().subtract(i, 'months').startOf('month').toDate();
            const monthEnd = currentDate.clone().subtract(i, 'months').endOf('month').toDate();

            const monthUsers = await Model.User.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });
            const monthOrders = await Model.Order.countDocuments({ createdAt: { $gte: monthStart, $lte: monthEnd } });

            monthlyUserStats.labels.push(currentDate.clone().subtract(i, 'months').format('MMM'));
            monthlyUserStats.data.push(monthUsers);

            monthlyOrderStats.labels.push(currentDate.clone().subtract(i, 'months').format('MMM'));
            monthlyOrderStats.data.push(monthOrders);
        }


        res.json({
            totalUsers,
            newUsers,
            monthlyUserStats,
            monthlyOrderStats,
            topUsers,
            totalCategories,
            totalSubcategories,
            totalProducts,
            totalOrders,
            todayOrders,
            totalSales: totalSales.length ? totalSales[0].total : 0,  // Total sales (all orders)
            todaySales: todaySales.length ? todaySales[0].total : 0 ,  // Today's sales
            newOrders
        });
    } catch (error) {
        console.error('Something went wrong', error);
        res.status(500).json({ message: 'Something went wrong' });
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
    // Ensure the passwords match
    if (password !== confirmPassword) {
        return res.status(400).send("Passwords do not match");
    }

    try {
        // Find the admin using the admin id from the session
        let admin = await Model.SuperAdmin.findOne({});
        if (!admin) {
            return res.status(404).send("Admin not found");
        }

        // Update admin details
        admin.name = name;

        // If password is provided, hash it and update
        if (password) {
            admin.password = password;  // Password will be hashed in the pre-save hook
        }
        console.log(admin,"admin")
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