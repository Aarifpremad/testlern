const mongoose = require('mongoose');
const Model = require('../models/model'),
Service = require('../service'),
localization = require('../service/localization');


module.exports = {

    register: async function (req, res, next) {
        try {
          const { email, mobileno, password, firstname, lastname } = req.body;
      
          if (!email || !password || !firstname || !lastname || !mobileno) {
            return res
              .status(200)
              .json(Service.response(false, localization.missingParamError, null));
          }
      
          // Check if the user already exists (by email or mobile number)
          let checkuser = await Model.User.findOne({ 
            $or: [{ email }, { mobileno }], 
            isdeleted: false 
          });
      
          if (checkuser) {
            return res
              .status(200)
              .json(Service.response(false, localization.UserAlreadyExist, null));
          }
      
          // Create user and hash the password
          let user = new Model.User({
            email,
            mobileno,
            firstname,
            lastname,
            password,
            token: [],
          });
      
          const Token = user.generateJWT();
          user.token.push(Token);
          await user.save();
      
          return res
            .status(200)
            .json(Service.response(true, "Welcome! SignUp Successfully", { currenttoken: Token, user: user.toAuthJSON() }));
      
        } catch (error) {
          console.log(error);
          return res.status(200).json(Service.response(false, localization.ServerError, null));
        }
    },
      
    login: async function (req, res, next) {
        try {
            const { name, email, password } = req.body;
    
            if ((!email && !name) || !password) {
                return res.status(200).json(Service.response(false, localization.missingParamError, null));
            }
    
            // Find user by email OR name
            const user = await Model.User.findOne({
                $or: [{ email }, { firstname: name }],
                isdeleted: false,
            });
    
            if (!user) {
                return res.status(200).json(Service.response(false, localization.usernotin, null));
            }
    
            let match = user.authenticate(password);
            if (!match) {
                return res.status(200).json(Service.response(false, localization.incorrectPassword, null));
            }
    
            const newToken = user.generateJWT();
            user.token = user.removeExpiredTokens();
    
            if (user.loginAllowed >= user.token.length) {
                user.token.push(newToken);
            } else {
                user.token.shift();
                user.token.push(newToken);
            }
    
            await user.save();
    
            let response = user.toAuthJSON();
            response.token = newToken;
            return res.status(200).json(Service.response(true, localization.loginSuccess, response));
    
        } catch (error) {
            console.log(error);
            return res.status(200).json(Service.response(false, localization.ServerError, null));
        }
      },
    
    profile: async function (req, res, next) {
    try {
        const user = req.user;
        return res.status(200).json(Service.response(true, "successfully Get profile", user.toAuthJSON()));
    } catch (error) {
        console.log(error);
        return res.status(500).json(Service.response(false, localization.ServerError, null));
    }
    },
  
    sendotp: async function (req, res, next) {
        try {
            const { email } = req.body;
    
            if (!email) {
                return res.status(400).json(Service.response(false, "Missing email."));
            }
    
            const currentTime = new Date();
            let existingOtp = await Model.OTP.findOne({ email });
            let otp = 1234
            if (existingOtp) {
                const timeDifference = (currentTime - existingOtp.lastSentTime) / 1000; 
                if (timeDifference < 60 && existingOtp.hitCount >= 10) {
                }
                if (timeDifference >= 60) {
                    existingOtp.hitCount = 1;
                    existingOtp.lastSentTime = currentTime;
                    existingOtp.otp = otp
                    existingOtp.expireTime = new Date(currentTime.getTime() + 5 * 60 * 1000); // 5 minutes validity
                    await existingOtp.save();
                } else {
                    existingOtp.hitCount += 1;
                    existingOtp.lastSentTime = currentTime;
                    existingOtp.otp = otp
                    existingOtp.expireTime = new Date(currentTime.getTime() + 5 * 60 * 1000); // 5 minutes validity
                    await existingOtp.save();
                }
                return res.status(200).json(Service.response(true, "OTP sent successfully.", {otp: existingOtp.otp}));

            }
            const otpCode = otp;
            const expireTime = new Date(currentTime.getTime() + 5 * 60 * 1000); // OTP valid for 5 minutes
            await Model.OTP.create({
                otp: otpCode,
                email,
                lastSentTime: currentTime,
                expireTime,
                hitCount: 1
            });
            return res.status(200).json(Service.response(true, "OTP sent successfully.", { otp: otpCode }));

        } catch (error) {
            console.log('Error in sending OTP:', error);
            return res.status(400).json(Service.response(false, "Internal server error."));
        }
     },

    verifyotp: async function (req, res, next) {
        try {
            const {  otp } = req.body;
            let user = req.user
            if (!otp) {
                return res.status(400).json(Service.response(false, "OTP are required"));
            }
    
    
            const otpRecord = await Model.OTP.findOne({ user: user._id, otp });
            if (!otpRecord) {
                return res.status(400).json(Service.response(false, "Invalid OTP"));
            }
    
            if (otpRecord.expireTime < new Date()) {
                return res.status(400).json(Service.response(false, "OTP has expired"));
            }
    
            await Model.OTP.deleteOne({ _id: otpRecord._id });
    
            return res.status(200).json({ message: 'OTP verified successfully',user });
        } catch (error) {
            console.error('Error in verifyOtp API:', error);
            res.status(500).json({ message: 'Internal server error', error: error.message });
        }
      },


      forgetpassword: async function (req, res, next) {
        const { email, newPassword } = req.body;
        

        if (!email || !newPassword  ) {
        return res
            .status(200)
            .json(Service.response(false, localization.missingParamError, null));
    }

        const user = await Model.User.findOne({ email,isdeleted:false });

        if (!user) {
            return res.status(200).json(Service.response(false, 'User not found', null));
        }
            user.password = newPassword; // Set new password
            await user.preparePassword(); // Ensure this is awaited for password hashing
            await user.save();
            return res.status(200).json(Service.response(true, 'Password reset successful', null));

    },
  
    deleteAccount: async function (req, res, next) {
        const { email, password, numeric_id } = req.body;
    
        if (!email || !password || !numeric_id) {
            return res.status(400).json(Service.response(0, 'Email, password aur numeric_id required hain', null));
        }
    
        const user = await Model.User.findOne({ email, isdeleted: false, numeric_id });
    
        if (!user) {
            return res.status(404).json(Service.response(false, 'User nahi mil raha hai', null));
        }
    
        // Password authentication
        const isValidPassword = await user.authenticate(password);
        if (!isValidPassword) {
            return res.status(401).json(Service.response(false, 'Invalid password', null));
        }
    
        // Marking user as deleted instead of deleting the record
        user.isdeleted = true;
        await user.save();
    
        // Optionally, remove the user's associated tokens if required
        // user.token = []; // If you want to delete all tokens
        // await user.save();
    
        return res.status(200).json(Service.response(true, 'Account successfully deleted (marked as deleted)', null));
    },
    

    resetpassword: async function (req, res, next) {
        try {
            const { email, oldPassword, newPassword } = req.body;
    
            if (!email || !oldPassword || !newPassword) {
                return res.status(400).json(Service.response(false, localization.missingParamError, null));
            }
    
            const user = await Model.User.findOne({ email, isdeleted: false });
            if (!user) {
                return res.status(404).json(Service.response(false, localization.UserNotFound, null));
            }
    
            // Check for old password
            const isOldPasswordValid = await user.authenticate(oldPassword);
            if (!isOldPasswordValid) {
                return res.status(400).json(Service.response(false, 'Old password invalid hai', null));
            }
    
            // Set the new password and hash it
            user.password = newPassword;
            await user.preparePassword(); // This ensures the password is hashed before saving
            await user.save();
    
            return res.status(200).json(Service.response(true, 'Password successfully updated', null));
        } catch (error) {
            console.error(error);
            return res.status(500).json(Service.response(false, localization.ServerError, null));
        }
    },
    
  
  }