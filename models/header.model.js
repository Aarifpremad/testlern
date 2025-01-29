const mongoose = require('mongoose');

const HeaderSchema = new mongoose.Schema({
    headerName: { type: String, required: true },
    pageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Page', required: true },
    position: { type: Number, default: 1 },
});

module.exports = mongoose.model('Header', HeaderSchema);
