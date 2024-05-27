const express = require('express');
const router = express.Router();
const Vrsta_odrzavanja = require('../models/vrsta_odrzavanja');

// Get all Vrsta_odrzavanja
router.get('/', async (req, res) => {
    try {
        const vrstaOdrzavanja = await Vrsta_odrzavanja.find();
        res.render('vrsta_odrzavanja/index', { vrstaOdrzavanja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to create new Vrsta_odrzavanja
router.get('/new', (req, res) => {
    res.render('vrsta_odrzavanja/new');
});

// Create new Vrsta_odrzavanja
router.post('/', async (req, res) => {
    const { Naziv, Opis } = req.body;
    const newVrstaOdrzavanja = new Vrsta_odrzavanja({ Naziv, Opis });

    try {
        await newVrstaOdrzavanja.save();
        res.redirect('/vrsta_odrzavanja');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to edit Vrsta_odrzavanja
router.get('/:id/edit', async (req, res) => {
    try {
        const vrstaOdrzavanja = await Vrsta_odrzavanja.findById(req.params.id);
        res.render('vrsta_odrzavanja/edit', { vrstaOdrzavanja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update Vrsta_odrzavanja
router.post('/:id', async (req, res) => {
    const { Naziv, Opis } = req.body;

    try {
        await Vrsta_odrzavanja.findByIdAndUpdate(req.params.id, { Naziv, Opis });
        res.redirect('/vrsta_odrzavanja');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete Vrsta_odrzavanja
router.post('/:id/delete', async (req, res) => {
    try {
        await Vrsta_odrzavanja.findByIdAndDelete(req.params.id);
        res.redirect('/vrsta_odrzavanja');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
