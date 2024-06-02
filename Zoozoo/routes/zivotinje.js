const express = require('express');
const router = express.Router();
const Zivotinje = require('../models/zivotinje');
const Smjestaj = require('../models/smjestaj'); // Dodajemo model za smještaj

// Prikaz svih životinja
router.get('/', async (req, res) => {
    try {
        const zivotinje = await Zivotinje.find().populate('Smjestaj');
        res.render('zivotinje/index', { zivotinje });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje nove životinje
router.get('/new', async (req, res) => {
    try {
        const smjestaji = await Smjestaj.find();
        res.render('zivotinje/new', { smjestaji: smjestaji }); 
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const { Ime, Datum_rodjenj, Zemlje_podrijetla, Datum_nabavke, Posebne_napomene, Smjestaj } = req.body;
    const novaZivotinja = new Zivotinje({ Ime, Datum_rodjenj, Zemlje_podrijetla, Datum_nabavke, Posebne_napomene, Smjestaj });

    try {
        await novaZivotinja.save();
        res.redirect('/zivotinje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje životinje
router.get('/:id/edit', async (req, res) => {
    try {
        const zivotinja = await Zivotinje.findById(req.params.id);
        const smjestaji = await Smjestaj.find(); // Dohvaćamo sve smještaje iz baze
        if (!zivotinja) {
            return res.status(404).send('Životinja nije pronađena.');
        }
        res.render('zivotinje/edit', { zivotinja, smjestaji });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o životinji
router.post('/:id', async (req, res) => {
    const { Ime, Datum_rodjenj, Zemlje_podrijetla, Datum_nabavke, Posebne_napomene, Smjestaj } = req.body;
    try {
        const updatedZivotinja = await Zivotinje.findByIdAndUpdate(
            req.params.id,
            { Ime, Datum_rodjenj, Zemlje_podrijetla, Datum_nabavke, Posebne_napomene, Smjestaj },
            { new: true }
        );
        if (!updatedZivotinja) {
            return res.status(404).send('Životinja nije pronađena.');
        }
        res.redirect('/zivotinje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje životinje
router.post('/:id/delete', async (req, res) => {
    try {
        await Zivotinje.findByIdAndDelete(req.params.id);
        res.redirect('/zivotinje');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

