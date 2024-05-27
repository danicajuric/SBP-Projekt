const express = require('express');
const router = express.Router();
const Pozicija = require('../models/pozicija');

// Prikaz svih pozicija
router.get('/', async (req, res) => {
    try {
        const pozicije = await Pozicija.find();
        res.render('pozicija/index', { pozicije });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje nove pozicije
router.get('/new', (req, res) => {
    res.render('pozicija/new');
});

router.post('/', async (req, res) => {
    const { Naziv, Opis } = req.body;
    const novaPozicija = new Pozicija({ Naziv, Opis });

    try {
        await novaPozicija.save();
        res.redirect('/pozicija');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje pozicije
router.get('/:id/edit', async (req, res) => {
    try {
        const pozicija = await Pozicija.findById(req.params.id);
        if (!pozicija) {
            return res.status(404).send('Pozicija nije pronađena.');
        }
        res.render('pozicija/edit', { pozicija });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o poziciji
router.put('/:id', async (req, res) => {
    const { Naziv, Opis } = req.body;
    try {
        const updatedPozicija = await Pozicija.findByIdAndUpdate(req.params.id, { Naziv, Opis }, { new: true });
        if (!updatedPozicija) {
            return res.status(404).send('Pozicija nije pronađena.');
        }
        res.redirect('/pozicija');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje pozicije
router.delete('/:id', async (req, res) => {
    try {
        const deletedPozicija = await Pozicija.findByIdAndDelete(req.params.id);
        if (!deletedPozicija) {
            return res.status(404).send('Pozicija nije pronađena.');
        }
        res.redirect('/pozicija');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
