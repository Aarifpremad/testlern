const mongoose = require('mongoose');

// Define the schema for the imagesforusers collection
const imageForUserSchema = new mongoose.Schema({
    img_title: {
        type: String,
        required: true
    },
    img_desc: {
        type: String,
        required: true
    },
    img_path: {
        type: String,
        required: true
    },
    redirect_url: {
        type: String,
        required: true
    },
    position: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
});

// Create the model
const ImageForUser = mongoose.model('ImageForUser', imageForUserSchema);

module.exports = ImageForUser;
