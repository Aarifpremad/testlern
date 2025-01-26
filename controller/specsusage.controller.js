// controllers/adminController.js

const SpecsUsage = require('../models/specesusage.model');

// Create Specs Usage
exports.createSpecsUsage = async (req, res) => {
    try {
        const { usage } = req.body;
        const newSpecsUsage = await SpecsUsage.create({ usage });
        res.status(201).json({ success: true, message: 'Specs Usage created successfully', data: newSpecsUsage });
    } catch (error) {
        console.error('Error creating Specs Usage:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Usage' });
    }
};

// Get all Specs Usages
exports.getSpecsUsages = async (req, res) => {
    try {
        const usages = await SpecsUsage.find();
        res.status(200).json({ success: true, data: usages });
    } catch (error) {
        console.error('Error fetching Specs Usages:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Usages' });
    }
};

// Delete Specs Usage
exports.deleteSpecsUsage = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsUsage.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Usage deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Usage:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Usage' });
    }
};
