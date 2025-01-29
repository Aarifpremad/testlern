const mongoose = require('mongoose');

const TeachPageSchema = new mongoose.Schema({
    pg_title: { type: String, required: true },
    pg_content: { type: String, required: true },
    pg_url_key: { type: String, required: true, unique: true },
    meta_title: { type: String },
    meta_keywords: { type: String },
    meta_desc: { type: String }
},
{ timestamps: true }
);

module.exports = mongoose.model('Page', TeachPageSchema);
