const mongoose = require('mongoose');
const slugify = require('slugify');

const subCategorySchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    status: { type: Boolean, default: true },
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true }, // Slug field
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String },
    position: { type: Number, default: 0 },
    image: { type: String },
    seo: {
        meta_title: { type: String },
        meta_description: { type: String },
        meta_keywords: { type: String }
    }
}, { timestamps: true });

// Generate slug before saving
subCategorySchema.pre('save', function (next) {
    if (this.isModified('name')) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
