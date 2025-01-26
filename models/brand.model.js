const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Brand', BrandSchema);
