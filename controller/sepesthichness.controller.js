// controllers/adminController.js

const SpecsThickness = require('../models/specsThickness.model');

// Create Specs Thickness
exports.createSpecsThickness = async (req, res) => {
    try {
        const { thickness } = req.body;
        const newSpecsThickness = await SpecsThickness.create({ thickness });
        res.status(201).json({ success: true, message: 'Specs Thickness created successfully', data: newSpecsThickness });
    } catch (error) {
        console.error('Error creating Specs Thickness:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Thickness' });
    }
};

// Get all Specs Thicknesses
exports.getSpecsThicknesses = async (req, res) => {
    try {
        const thicknesses = await SpecsThickness.find();
        res.status(200).json({ success: true, data: thicknesses });
    } catch (error) {
        console.error('Error fetching Specs Thicknesses:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Thicknesses' });
    }
};

// Delete Specs Thickness
exports.deleteSpecsThickness = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsThickness.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Thickness deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Thickness:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Thickness' });
    }
};
