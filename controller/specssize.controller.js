// controllers/adminController.js

const SpecsSize = require('../models/specssize.model');

// Create Specs Size
exports.createSpecsSize = async (req, res) => {
    try {
        const { size } = req.body;
        const newSpecsSize = await SpecsSize.create({ size });
        res.status(201).json({ success: true, message: 'Specs Size created successfully', data: newSpecsSize });
    } catch (error) {
        console.error('Error creating Specs Size:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Size' });
    }
};

// Get all Specs Sizes
exports.getSpecsSizes = async (req, res) => {
    try {
        const sizes = await SpecsSize.find();
        res.status(200).json({ success: true, data: sizes });
    } catch (error) {
        console.error('Error fetching Specs Sizes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Sizes' });
    }
};

// Delete Specs Size
exports.deleteSpecsSize = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsSize.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Size deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Size:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Size' });
    }
};
