const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-auto-increment');

// Initialize mongoose-auto-increment
// autoIncrement.initialize(mongoose.connection);

// Define the Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    position: { type: Number, default: 0 },
    discount_line: { type: String, default: '' },
    status: { type: Boolean, default: true },
    category_status: { type: Boolean, default: true },
    description: { type: String, default: '' },
    label: { type: String, default: '' },
    banner: { type: String, default: '' },
    category_image: { type: [String], default: [] },  // Array of image paths
    banner_image: { type: [String], default: [] },   // Array of banner image paths
    seo: {
        meta_title: { type: String, default: '' },
        meta_description: { type: String, default: '' },
        meta_keywords: { type: String, default: '' }
    },
    heading: { type: String, default: '' },
    content: { type: String, default: '' },
    id: { type: Number, default: 0 },  // Auto increment ID
}, { timestamps: true });

// Apply the auto-increment plugin
// categorySchema.plugin(autoIncrement.plugin, {
//     model: 'Category',
//     field: 'id',
//     startAt: 1,
//     incrementBy: 1
// });

// Create and export the model
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
