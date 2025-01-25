'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Product Schema
const ProductSchema = new Schema({
  id: {
    type: String, // Sequential ID
    unique: true
},
  name: {
    type: String,
    // required: true,
    trim: true
  },
  brand: {
    type: String,
    // required: true,
    trim: true
  },
  skuCode: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  },
  urlKey: {
    type: String,
    // required: true,
    // unique: true,
    trim: true
  },
  visibility: {
    type: Boolean,
    default: true
  },
  productLabel: {
    type: String,
    trim: true
  },
  size: {
    type: String,
    // required: true
  },
  productType: {
    type: String,
    // required: true
  },
  group: {
    type: String,
    trim: true
  },
  unit: {
    type: String,
    // required: true
  },
  serialNo: {
    type: String,
    // required: true,
    // unique: true
  },
  description: {
    type: String,
    // required: true
  },
  metaDescription: {
    metaTitle: {
      type: String,
      trim: true
    },
    metaKeywords: {
      type: [String],
      trim: true
    },
    metaDescription: {
      type: String,
      trim: true
    }
  },
  price: {
    price: {
      type: Number,
      // required: true
    },
    ourPrice: {
      type: Number,
      // required: true
    },
    ourCutPrice: {
      type: Number,
      // required: true
    },
    ourFullCutPrice: {
      type: Number,
      // required: true
    }
  },
  images: {
    type: [String], // Array of image URLs
    // required: true
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      // required: true
    }
  ],
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory',
      // required: true
    }
  ],
  linkedProducts: {
    relatedProducts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      }
    ],
  }
}, { timestamps: true });

// Create an instance method to format the product response
ProductSchema.methods.toProductJSON = function () {
  return {
    _id: this._id,
    name: this.name,
    brand: this.brand,
    skuCode: this.skuCode,
    urlKey: this.urlKey,
    visibility: this.visibility,
    productLabel: this.productLabel,
    size: this.size,
    productType: this.productType,
    group: this.group,
    unit: this.unit,
    serialNo: this.serialNo,
    description: this.description,
    metaDescription: this.metaDescription,
    price: this.price,
    images: this.images,
    categories: this.categories,
    subCategories: this.subCategories,
    linkedProducts: this.linkedProducts
  };
};


ProductSchema.pre('save', async function (next) {
  if (!this.id) {
      const maxId = await mongoose
          .model('Product')
          .findOne({})
          .sort({ id: -1 })
          .select('id')
          .lean();
      this.id = maxId ? maxId.id + 1 : 1; // Set the ID sequentially
  }
  next();
});


// Create the Product model
const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
