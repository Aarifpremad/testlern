// controllers/adminController.js

const SpecsFinish = require('../models/specsfinish.model');

// Create Specs Finish
exports.createSpecsFinish = async (req, res) => {
    try {
        const { name } = req.body;
        const newSpecsFinish = await SpecsFinish.create({ name });
        res.status(201).json({ success: true, message: 'Specs Finish created successfully', data: newSpecsFinish });
    } catch (error) {
        console.error('Error creating Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Finish' });
    }
};

// Get all Specs Finishes
exports.getSpecsFinishes = async (req, res) => {
    try {
        const finishes = await SpecsFinish.find();
        res.status(200).json({ success: true, data: finishes });
    } catch (error) {
        console.error('Error fetching Specs Finishes:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Finishes' });
    }
};

// Delete Specs Finish
exports.deleteSpecsFinish = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsFinish.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Finish deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Finish:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Finish' });
    }
};
