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
    brand: { type: String },
    sku: { type: String, trim: true },
    urlKey: { type: String, trim: true },
    size: { type: String },
    group: { type: String },
    productSerialNo: { type: String,},
    unit: { type: String },
    description: { type: String },
    productType :{ type: String },
    productLabel :{ type: String },
    metaDescription: {
      metaTitle: { type: String, trim: true },
      metaKeywords: { type: [String], trim: true },
      metaDescription: { type: String, trim: true },
    },
    price: {
      price: { type: Number, },
      ourPrice: { type: Number, },
      ourCutPrice: { type: Number },
      ourFullCutPrice: { type: Number },
    },
    tilesPerfection: {
      description: { type: String },
      appearance:  { type: String },
      material:  { type: String },
      glaze: { type: String },
      rectified:  { type: String },
      color:  { type: String },
      thickness:  { type: String },
      recommendedRoom:  { type: String },
      quantityPerSquareMeter: { type: String },
      type:  { type: String },
      print:  { type: String },
      usage:  { type: String },
      sizeMM:  { type: String },
      boxQuantity:  { type: String },
      wastage:  { type: String },
    },
    images: [{ type: String }],
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    subCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }],
    linkedProducts:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    stock:{type:String,default:""},
    status:{
      type: Boolean,
      default :true
    },
    serialno :{
      type:Number,
      default :0
    },
    isVisible: {
      type: Boolean,
      default :true
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

