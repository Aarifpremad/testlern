// controllers/adminController.js

const SpecsType = require('../models/specstype.model');

// Create Specs Type
exports.createSpecsType = async (req, res) => {
    try {
        const { type } = req.body;
        const newSpecsType = await SpecsType.create({ type });
        res.status(201).json({ success: true, message: 'Specs Type created successfully', data: newSpecsType });
    } catch (error) {
        console.error('Error creating Specs Type:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Type' });
    }
};

// Get all Specs Types
exports.getSpecsTypes = async (req, res) => {
    try {
        const types = await SpecsType.find();
        res.status(200).json({ success: true, data: types });
    } catch (error) {
        console.error('Error fetching Specs Types:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Types' });
    }
};

// Delete Specs Type
exports.deleteSpecsType = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsType.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Type deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Type:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Type' });
    }
};
