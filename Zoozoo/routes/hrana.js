const express = require('express');
const router = express.Router();
const Hrana = require('../models/hrana');

// Get all hrana
router.get('/', async (req, res) => {
    try {
        const hrana = await Hrana.find();
        res.render('hrana/index', { hrana });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to create new hrana
router.get('/new', (req, res) => {
    res.render('hrana/new');
});

// Create new hrana
router.post('/', async (req, res) => {
    const { Naziv, Tip, Kolicina } = req.body;
    const newHrana = new Hrana({ Naziv, Tip, Kolicina });

    try {
        await newHrana.save();
        res.redirect('/hrana');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to edit hrana
router.get('/:id/edit', async (req, res) => {
    try {
        const hrana = await Hrana.findById(req.params.id);
        res.render('hrana/edit', { hrana });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update hrana
router.post('/:id', async (req, res) => {
    const { Naziv, Tip, Kolicina } = req.body;

    try {
        await Hrana.findByIdAndUpdate(req.params.id, { Naziv, Tip, Kolicina });
        res.redirect('/hrana');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete hrana
router.post('/:id/delete', async (req, res) => {
    try {
        await Hrana.findByIdAndDelete(req.params.id);
        res.redirect('/hrana');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
