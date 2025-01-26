// controllers/adminController.js

const SpecsRoom = require('../models/room.model');

// Create Specs Room
exports.createSpecsRoom = async (req, res) => {
    try {
        const { room } = req.body;
        const newSpecsRoom = await SpecsRoom.create({ room });
        res.status(201).json({ success: true, message: 'Specs Room created successfully', data: newSpecsRoom });
    } catch (error) {
        console.error('Error creating Specs Room:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Room' });
    }
};

// Get all Specs Rooms
exports.getSpecsRooms = async (req, res) => {
    try {
        const rooms = await SpecsRoom.find();
        res.status(200).json({ success: true, data: rooms });
    } catch (error) {
        console.error('Error fetching Specs Rooms:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Rooms' });
    }
};

// Delete Specs Room
exports.deleteSpecsRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsRoom.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Room deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Room:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Room' });
    }
};
