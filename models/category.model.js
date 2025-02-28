const mongoose = require('mongoose');
const slugify = require('slugify'); // Install slugify using: npm install slugify

const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, unique: true }, // Slug field
    position: { type: Number, default: 0 },
    discount_line: { type: String, default: '' },
    status: { type: Boolean, default: true },
    category_status: { type: Boolean, default: true },
    description: { type: String, default: '' },
    label: { type: String, default: '' },
    banner: { type: String, default: '' },
    category_image: { type: [String], default: [] },
    banner_image: { type: [String], default: [] },
    seo: {
        meta_title: { type: String, default: '' },
        meta_description: { type: String, default: '' },
        meta_keywords: { type: String, default: '' }
    },
    heading: { type: String, default: '' },
    content: { type: String, default: '' },
    id: { type: Number, default: 0 },
}, { timestamps: true });

// Generate slug before saving
categorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
