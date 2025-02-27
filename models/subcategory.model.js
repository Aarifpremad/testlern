const mongoose = require('mongoose');

// Define the SubCategory schema
const subCategorySchema = new mongoose.Schema(
    {
        id: {
            type: Number, // Sequential ID
            unique: true
        },
    status: { type: Boolean, default: true },

        name: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category', // Reference to the Category model
            required: true
        },
        description: {
            type: String
        },
        position: {
            type: Number, // Position field for ordering
            default: 0
        },
        image: {
            type: String, // Path to uploaded image
            // required: true
        },
        seo: {
            meta_title: {
                type: String,
                // required: true
            },
            meta_description: {
                type: String,
                // required: true
            },
            meta_keywords: {
                type: String,
                // required: true
            }
        },
        
    },
    
    { timestamps: true }
);

// Auto-increment ID logic
subCategorySchema.pre('save', async function (next) {
    if (!this.id) {
        const maxId = await mongoose
            .model('SubCategory')
            .findOne({})
            .sort({ id: -1 })
            .select('id')
            .lean();
        this.id = maxId ? maxId.id + 1 : 1; // Set the ID sequentially
    }
    next();
});

// Create and export the SubCategory model
const SubCategory = mongoose.model('SubCategory', subCategorySchema);
module.exports = SubCategory;
