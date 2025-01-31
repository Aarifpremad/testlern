const express = require('express');
const router = express.Router();
const Header = require('../models/header.model');
const Page = require('../models/page.model'); 

// Get all headers
router.get('/headers', async (req, res) => {
    try {
        let { page, limit } = req.query;
        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};
        const totalRecords = await Header.countDocuments(query);
        const headers = await Header.find(query)
            .populate('pageId', 'pg_title')
            .skip(skip)
            .limit(limit);

        res.json({
            draw: req.query.draw || 1,  // Required by DataTables
            recordsTotal: totalRecords,
            recordsFiltered: totalRecords, // No filtering applied
            headers: headers.map(header => ({
                _id: header._id,
                headerName: header.headerName,
                pageName: header.pageId ? header.pageId.pg_title : 'N/A',
            }))
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching headers' });
    }
});


// Fetch all pages
router.get('/pages', async (req, res) => {
    try {
        const pages = await Page.find();
        res.json({ pages });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching pages' });
    }
});

// Add new header
router.post('/headers', async (req, res) => {
    try {
        const { headerName, pageId } = req.body;
        const newHeader = new Header({ headerName, pageId });
        await newHeader.save();
        res.status(201).json({ message: 'Header added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error adding header' });
    }
});

// Delete header
router.delete('/headers/:id', async (req, res) => {
    try {
        await Header.findByIdAndDelete(req.params.id);
        res.json({ message: 'Header deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting header' });
    }
});

module.exports = router;
