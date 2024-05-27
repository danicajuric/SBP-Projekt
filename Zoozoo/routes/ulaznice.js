// routes/ulaznice.js
const express = require('express');
const router = express.Router();
const Ulaznice = require('../models/ulaznice');

// Prikaz svih ulaznica
router.get('/', async (req, res) => {
    try {
        const ulaznice = await Ulaznice.find();
        res.render('ulaznice/index', { ulaznice });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje nove ulaznice
router.get('/new', (req, res) => {
    res.render('ulaznice/new');
});

router.post('/', async (req, res) => {
    const { Cijena, Datum_prodaje, Zaposlenik, Datum_dolaska } = req.body;
    const novaUlaznica = new Ulaznice({ Cijena, Datum_prodaje, Zaposlenik, Datum_dolaska });

    try {
        await novaUlaznica.save();
        res.redirect('/ulaznice');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje ulaznice
router.get('/:id/edit', async (req, res) => {
    try {
        const ulaznica = await Ulaznice.findById(req.params.id);
        if (!ulaznica) {
            return res.status(404).send('Ulaznica nije pronađena.');
        }
        res.render('ulaznice/edit', { ulaznica });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o ulaznici
router.put('/:id', async (req, res) => {
    const { Cijena, Datum_prodaje, Zaposlenik, Datum_dolaska } = req.body;
    try {
        const updatedUlaznica = await Ulaznice.findByIdAndUpdate(req.params.id, { Cijena, Datum_prodaje, Zaposlenik, Datum_dolaska }, { new: true });
        if (!updatedUlaznica) {
            return res.status(404).send('Ulaznica nije pronađena.');
        }
        res.redirect('/ulaznice');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje ulaznice
router.post('/:id/delete', async (req, res) => {
    try {
        await Ulaznice.findByIdAndDelete(req.params.id);
        res.redirect('/ulaznice');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
