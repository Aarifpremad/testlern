const express = require('express');
const router = express.Router();
const Page = require('../models/page.model');

// Get all pages
router.get('/teach-pages', async (req, res) => {
    try {
        const pages = await Page.find({});
        res.json({ data: pages });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Add a new page
router.post('/teach-pages', async (req, res) => {
    try {
        const { pg_title, pg_content, pg_url_key } = req.body;
        console.log(req.body)
        const newPage = new Page({ pg_title, pg_content, pg_url_key,meta_title,meta_description,meta_keywords  });
        await newPage.save();
        res.sendStatus(201);
    } catch (err) {
        console.log(err)
        res.status(400).send(err.message);
    }
});

// Delete a page
router.delete('/teach-pages/:id', async (req, res) => {
    try {
        await Page.findByIdAndDelete(req.params.id);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
