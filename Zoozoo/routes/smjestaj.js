// routes/smjestaj.js
const express = require('express');
const router = express.Router();
const Smjestaj = require('../models/smjestaj');
const Podrucja = require('../models/podrucja');

// Prikaz svih smjestaja
router.get('/', async (req, res) => {
    try {
        const smjestaji = await Smjestaj.find().populate('Podrucje');
        res.render('smjestaj/index', { smjestaji });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za dodavanje novog smještaja
router.get('/new', async (req, res) => {
    try {
        const podrucja = await Podrucja.find();
        res.render('smjestaj/new', { podrucja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Kreiranje novog smještaja
router.post('/', async (req, res) => {
    const { Naziv, Kapacitet, Podrucje } = req.body;
    const newSmjestaj = new Smjestaj({ Naziv, Kapacitet, Podrucje });

    try {
        await newSmjestaj.save();
        res.redirect('/smjestaj');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje smještaja
router.get('/:id/edit', async (req, res) => {
    try {
        const smjestaj = await Smjestaj.findById(req.params.id);
        if (!smjestaj) {
            return res.status(404).send('Smještaj nije pronađen.');
        }
        const podrucja = await Podrucja.find();
        res.render('smjestaj/edit', { smjestaj, podrucja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o smještaju
router.post('/:id', async (req, res) => { // Promijenjeno u POST
    const { Naziv, Kapacitet, Podrucje } = req.body;
    try {
        await Smjestaj.findByIdAndUpdate(req.params.id, { Naziv, Kapacitet, Podrucje });
        res.redirect('/smjestaj');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje smještaja
router.post('/:id/delete', async (req, res) => {
    try {
        await Smjestaj.findByIdAndDelete(req.params.id);
        res.redirect('/smjestaj');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
