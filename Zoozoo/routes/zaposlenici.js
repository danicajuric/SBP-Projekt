const express = require('express');
const router = express.Router();
const Zaposlenici = require('../models/zaposlenici');

// Get all zaposlenici
router.get('/', async (req, res) => {
    try {
        const zaposlenici = await Zaposlenici.find();
        res.render('zaposlenici/index', { zaposlenici });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to create new zaposlenik
router.get('/new', (req, res) => {
    res.render('zaposlenici/new');
});

// Create new zaposlenik
router.post('/', async (req, res) => {
    const { Ime_i_prezime, JMBG, Datum_rodjenja, Datum_zaposlenja, Pozicija } = req.body;
    const newZaposlenik = new Zaposlenici({ Ime_i_prezime, JMBG, Datum_rodjenja, Datum_zaposlenja, Pozicija });

    try {
        await newZaposlenik.save();
        res.redirect('/zaposlenici');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Get form to edit zaposlenik
router.get('/:id/edit', async (req, res) => {
    try {
        const zaposlenik = await Zaposlenici.findById(req.params.id);
        res.render('zaposlenici/edit', { zaposlenik });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update zaposlenik
router.post('/:id', async (req, res) => {
    const { Ime_i_prezime, JMBG, Datum_rodjenja, Datum_zaposlenja, Pozicija } = req.body;

    try {
        await Zaposlenici.findByIdAndUpdate(req.params.id, { Ime_i_prezime, JMBG, Datum_rodjenja, Datum_zaposlenja, Pozicija });
        res.redirect('/zaposlenici');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Delete zaposlenik
router.post('/:id/delete', async (req, res) => {
    try {
        await Zaposlenici.findByIdAndDelete(req.params.id);
        res.redirect('/zaposlenici');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;