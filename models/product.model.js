'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    name: { type: String, required: true, trim: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', required: true },
    sku: { type: String, trim: true },
    urlKey: { type: String, trim: true },
    size: { type: String, enum: ['S', 'M', 'L', 'XL']},
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductGroup' },
    productSerialNo: { type: String, unique: true },
    unit: { type: String, ref: 'Unit' , required: true },
    description: { type: String },
    metaDescription: {
      metaTitle: { type: String, trim: true },
      metaKeywords: { type: [String], trim: true },
      metaDescription: { type: String, trim: true },
    },
    price: {
      price: { type: Number, required: true },
      ourPrice: { type: Number, required: true },
      ourCutPrice: { type: Number },
      ourFullCutPrice: { type: Number },
    },
    tilesPerfection: {
      description: { type: String },
      appearance: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsFinish' },
      material: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsMaterial' },
      glaze: { type: String, enum: ['Glazed', 'No'], required: true },
      rectified: { type: String, enum: ['Rectified', 'No'], required: true },
      color: { type: mongoose.Schema.Types.ObjectId, ref: 'Color' },
      thickness: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsThickness' },
      recommendedRoom: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsRoom' },
      quantityPerSquareMeter: { type: Number },
      type: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsType' },
      print: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsPrint' },
      usage: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsUsage' },
      sizeMM: { type: mongoose.Schema.Types.ObjectId, ref: 'SpecsSize' },
      boxQuantity: { type: Number },
      wastage: { type: Number },
    },
    images: [{ type: String }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    linkedProducts: {
      relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    },
  },
  { timestamps: true }
);





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
