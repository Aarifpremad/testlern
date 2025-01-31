'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  jwt = require('jsonwebtoken'),
  bcrypt = require('bcryptjs'); // bcrypt import karein

/**
 * A Validation function for local strategy password
 */
const validateLocalStrategyPassword = function (password) {
  return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
const UserSchema = new Schema(
  {
    numeric_id: {
      type: Number,
      required: 'Numeric Id is required',
      unique: true,
    },
    firstname: {
      type: String,
      unique: true,
      sparse: true, // ✅ Empty values ko ignore karega unique constraint
    },
    lastname: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true, // ✅ Empty values ko ignore karega unique constraint
    },
    mobileno: {
      type: String,
      unique: true,
      sparse: true, // ✅ Empty values ko ignore karega unique constraint
    },
    password: {
      type: String,
      validate: [validateLocalStrategyPassword, 'Password should be longer'],
    },
    status: {
      type: Boolean,
      default: false,
    },
    token: [
      {
        type: String,
      },
    ],
    salt: {
      type: String,
    },
    updated: {
      type: Date,
    },
    balance: {
      type: Number,
      default: 0,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },
    loginAllowed: {
      type: Number,
      default: 1,
    },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    isdeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

/**
 * Hash the password before saving using bcrypt
 */
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    // Generating salt using bcrypt
    const salt = await bcrypt.genSalt(10);
    // Hashing password using bcrypt
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

/**
 * Authenticate user by comparing passwords using bcrypt
 */
UserSchema.methods.authenticate = async function (password) {
  // Comparing hashed password with input password
  return await bcrypt.compare(password, this.password);
};

/**
 * Remove expired tokens
 */
UserSchema.methods.removeExpiredTokens = function () {
  const currentTime = Math.floor(Date.now() / 1000);
  this.token = this.token.filter((token) => {
    const decoded = jwt.decode(token);
    return decoded && decoded.exp > currentTime;
  });
  return this.token;
};

/**
 * JWT Token Generator
 */
UserSchema.methods.generateJWT = function () {
  const exp = Math.floor(Date.now() / 1000) + 60; // 1 min expiry
  return jwt.sign({ id: this._id, email: this.email, exp }, 'config.tokensecret');
};

/**
 * Return user data in JSON format
 */
UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    numeric_id: this.numeric_id,
    firstname: this.firstname,
    lastname: this.lastname,
    mobileno: this.mobileno,
    email: this.email,
    city: this.city,
    phone: this.phone,
    status: this.status,
    balance: this.balance,
  };
};

UserSchema.pre('save', async function (next) {
  if (!this.id) {
    const maxId = await mongoose
      .model('User')
      .findOne({})
      .sort({ numeric_id: -1 })
      .select('numeric_id')
      .lean();
    this.numeric_id = maxId ? maxId.numeric_id + 1 : 1; // Set the ID sequentially
  }
  next();
});

// If you want to hash password when it's set, use this preparePassword function
UserSchema.methods.preparePassword = async function () {
  // Generating salt using bcrypt
  const salt = await bcrypt.genSalt(10);
  // Hashing password using bcrypt
  this.password = await bcrypt.hash(this.password, salt);
};

module.exports = mongoose.model('User', UserSchema);
