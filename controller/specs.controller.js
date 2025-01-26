// controllers/adminController.js

const SpecsPrint = require('../models/SpecsPrint');

// Create Specs Print
exports.createSpecsPrint = async (req, res) => {
    try {
        const { print } = req.body;
        const newSpecsPrint = await SpecsPrint.create({ print });
        res.status(201).json({ success: true, message: 'Specs Print created successfully', data: newSpecsPrint });
    } catch (error) {
        console.error('Error creating Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to create Specs Print' });
    }
};

// Get all Specs Prints
exports.getSpecsPrints = async (req, res) => {
    try {
        const prints = await SpecsPrint.find();
        res.status(200).json({ success: true, data: prints });
    } catch (error) {
        console.error('Error fetching Specs Prints:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch Specs Prints' });
    }
};

// Delete Specs Print
exports.deleteSpecsPrint = async (req, res) => {
    try {
        const { id } = req.params;
        await SpecsPrint.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Specs Print deleted successfully' });
    } catch (error) {
        console.error('Error deleting Specs Print:', error);
        res.status(500).json({ success: false, message: 'Failed to delete Specs Print' });
    }
};
