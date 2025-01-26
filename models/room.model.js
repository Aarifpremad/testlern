// models/SpecsRoom.js
const mongoose = require('mongoose');

const specsRoomSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('SpecsRoom', specsRoomSchema);
