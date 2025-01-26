// controllers/colorController.js
const Color = require('../models/color.model');

// Get all colors
exports.getColors = async (req, res) => {
    try {
        const colors = await Color.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: colors });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error fetching colors' });
    }
};

// Add a new color
exports.addColor = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ success: false, message: 'Color name is required' });
        }

        const newColor = new Color({ name });
        await newColor.save();

        res.status(201).json({ success: true, message: 'Color added successfully', data: newColor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error adding color' });
    }
};

// Delete a color
exports.deleteColor = async (req, res) => {
    try {
        const { id } = req.params;

        const color = await Color.findById(id);
        if (!color) {
            return res.status(404).json({ success: false, message: 'Color not found' });
        }

        await color.deleteOne();
        res.status(200).json({ success: true, message: 'Color deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error deleting color' });
    }
};
