// controllers/adminController.js

const SpecsMaterial = require('../models/specsMaterial.model');

// Create Specs Material
exports.createSpecsMaterial = async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecsMaterial = await SpecsMaterial.create({ name });
        res.status(201).json({ success: true, message: 'Specs Material created successfully', data: newSpecsMaterial });
    } catch (error) {
        console.error('Error creating Specs Material:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Material' });
    }
};

// Get all Specs Materials
exports.getSpecsMaterials = async (req, res) => {
    try {
        const materials = await SpecsMaterial.find();
        res.status(200).json({ success: true, data: materials });
    } catch (error) {
        console.error('Error fetching Specs Materials:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Materials' });
    }
};

// Delete Specs Material
exports.deleteSpecsMaterial = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsMaterial.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Material deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Material:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Material' });
    }
};
