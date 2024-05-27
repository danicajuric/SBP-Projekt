// routes/vrste_zivotinja.js
const express = require('express');
const router = express.Router();
const VrsteZivotinja = require('../models/vrste_zivotinja');

// Prikaz svih vrsta životinja
router.get('/', async (req, res) => {
    try {
        const vrsteZivotinja = await VrsteZivotinja.find();
        res.render('vrste_zivotinja/index', { vrsteZivotinja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje nove vrste životinje
router.get('/new', (req, res) => {
    res.render('vrste_zivotinja/new');
});

router.post('/', async (req, res) => {
    const { Naziv, Opis } = req.body;
    const novaVrstaZivotinje = new VrsteZivotinja({ Naziv, Opis });

    try {
        await novaVrstaZivotinje.save();
        res.redirect('/vrste_zivotinja');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje vrste životinje
router.get('/:id/edit', async (req, res) => {
    try {
        const vrstaZivotinje = await VrsteZivotinja.findById(req.params.id);
        if (!vrstaZivotinje) {
            return res.status(404).send('Vrsta životinje nije pronađena.');
        }
        res.render('vrste_zivotinja/edit', { vrstaZivotinje });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o vrsti životinje
router.put('/:id', async (req, res) => {
    const { Naziv, Opis } = req.body;
    try {
        const updatedVrstaZivotinje = await VrsteZivotinja.findByIdAndUpdate(req.params.id, { Naziv, Opis }, { new: true });
        if (!updatedVrstaZivotinje) {
            return res.status(404).send('Vrsta životinje nije pronađena.');
        }
        res.redirect('/vrste_zivotinja');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje vrste životinje
router.post('/:id/delete', async (req, res) => {
    try {
        await VrsteZivotinja.findByIdAndDelete(req.params.id);
        res.redirect('/vrste_zivotinja');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
