const mongoose = require('mongoose');
const Model = require('../models/model'),
Service = require('../service'),
localization = require('../service/localization');


module.exports = {

    register: async function (req, res, next) {
        try {
          const { email, mobileno, password, firstname, lastname } = req.body;
      
          if (!email || !password) {
            return res
              .status(200)
              .json(Service.response(false, localization.missingParamError, null));
          }
      
          let checkuser = await Model.User.findOne({
            email: email ,
            isdeleted: false
          });
      
      
          if (checkuser) {
            return res
              .status(200)
              .json(Service.response(false, localization.UserAlreadyExist, null));
          }
      
          let user = new Model.User({
            email,
            mobileno,
            firstname,
            lastname,
            password,
            token: [],
            numeric_id: 1, 
          });
      
          const maxId = await Model.User.findOne({}).sort({ numeric_id: -1 }).select('numeric_id');
          user.numeric_id = maxId ? maxId.numeric_id + 1 : 1;
      
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
            const { firstname, email, password } = req.body;
    
            if ((!email && !firstname) || !password) {
                return res.status(200).json(Service.response(false, localization.missingParamError, null));
            }
            let user
            if(email){
                 user = await Model.User.findOne({
                    email:email,
                    isdeleted: false,
                });
                if (!user) {
                    return res.status(200).json(Service.response(false, localization.usernotin, null));
                }
            }else{
                 user = await Model.User.findOne({
                    firstname:firstname,
                    isdeleted: false,
                });
                if (!user) {
                    return res.status(200).json(Service.response(false, localization.usernotin, null));
                }
            }
            
            
            
    
            let match =await user.authenticate(password);
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
            const {  email ,otp} = req.body;
            if (!otp) {
                return res.status(400).json(Service.response(false, "OTP are required"));
            }
    
    
            const otpRecord = await Model.OTP.findOne({ email: email , otp });
            if (!otpRecord) {
                return res.status(400).json(Service.response(false, "Invalid OTP"));
            }
    
            if (otpRecord.expireTime < new Date()) {
                return res.status(400).json(Service.response(false, "OTP has expired"));
            }
    
            await Model.OTP.deleteOne({ _id: otpRecord._id });
    
            return res.status(200).json({ message: 'OTP verified successfully' });
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
            user.password = newPassword; 
            await user.save();
            return res.status(200).json(Service.response(true, 'Password reset successful', null));

    },
  
    deleteAccount: async function (req, res, next) {
        const { email, password  } = req.body;
    
        if (!email || !password ) {
            return res.status(400).json(Service.response(0, 'Email, password aur numeric_id required hain', null));
        }
    
        const user = await Model.User.findOne({ email, isdeleted: false });
    
        if (!user) {
            return res.status(404).json(Service.response(false, 'User nahi mil raha hai', null));
        }
    
        const isValidPassword = await user.authenticate(password);
        if (!isValidPassword) {
            return res.status(401).json(Service.response(false, 'Invalid password', null));
        }
    
        user.isdeleted = true;
        await user.save();
    

    
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
                return res.status(404).json(Service.response(false, "user Not Found", null));
            }
    
            const isOldPasswordValid = await user.authenticate(oldPassword);
            if (!isOldPasswordValid) {
                return res.status(400).json(Service.response(false, 'Old password invalid hai', null));
            }
    
            user.password = newPassword;
            await user.save();
    
            return res.status(200).json(Service.response(true, 'Password successfully updated', null));
        } catch (error) {
            console.error(error);
            return res.status(500).json(Service.response(false, localization.ServerError, null));
        }
    },
    
    
  }