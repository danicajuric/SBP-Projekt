// routes/hranjenje.js
const express = require('express');
const router = express.Router();
const Hranjenje = require('../models/hranjenje');
const Zaposlenici = require('../models/zaposlenici');
const Hrana = require('../models/hrana');
const Smjestaj = require('../models/smjestaj');

// Prikaz svih hranjenja
router.get('/', async (req, res) => {
    try {
        const hranjenje = await Hranjenje.find();
        res.render('hranjenje/index', { hranjenje });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za dodavanje novog hranjenja
router.get('/new', async (req, res) => {
    try {
        const zaposlenici = await Zaposlenici.find();
        const hrana = await Hrana.find();
        const smjestaji = await Smjestaj.find();
        res.render('hranjenje/new', { zaposlenici, hrana, smjestaji });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje novog hranjenja
router.post('/', async (req, res) => {
    const { Zaposlenik, Hrana, Smjestaj, Datum_i_vrijeme } = req.body;
    const novoHranjenje = new Hranjenje({ Zaposlenik, Hrana, Smjestaj, Datum_i_vrijeme });

    try {
        await novoHranjenje.save();
        res.redirect('/hranjenje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje hranjenja
router.get('/:id/edit', async (req, res) => {
    try {
        const hranjenje = await Hranjenje.findById(req.params.id);
        if (!hranjenje) {
            return res.status(404).send('Hranjenje nije pronađeno.');
        }
        const zaposlenici = await Zaposlenici.find();
        const hrana = await Hrana.find();
        const smjestaji = await Smjestaj.find();
        res.render('hranjenje/edit', { hranjenje, zaposlenici, hrana, smjestaji });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o hranjenju
router.put('/:id', async (req, res) => {
    const { Zaposlenik, Hrana, Smjestaj, Datum_i_vrijeme } = req.body;
    try {
        const updatedHranjenje = await Hranjenje.findByIdAndUpdate(req.params.id, { Zaposlenik, Hrana, Smjestaj, Datum_i_vrijeme }, { new: true });
        if (!updatedHranjenje) {
            return res.status(404).send('Hranjenje nije pronađeno.');
        }
        res.redirect('/hranjenje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje hranjenja
router.post('/:id/delete', async (req, res) => {
    try {
        await Hranjenje.findByIdAndDelete(req.params.id);
        res.redirect('/hranjenje');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
