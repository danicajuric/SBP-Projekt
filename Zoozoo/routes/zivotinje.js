// routes/zivotinje.js
const express = require('express');
const router = express.Router();
const Zivotinje = require('../models/zivotinje');

// Prikaz svih životinja
router.get('/', async (req, res) => {
    try {
        const zivotinje = await Zivotinje.find();
        res.render('zivotinje/index', { zivotinje });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Dodavanje nove životinje
router.get('/new', (req, res) => {
    res.render('zivotinje/new');
});

router.post('/', async (req, res) => {
    const { Ime, DatumRodjenja, ZemljaPodrijetla, DatumNabavke, PosebneNapomene, Smjestaj } = req.body;
    const novaZivotinja = new Zivotinje({ Ime, DatumRodjenja, ZemljaPodrijetla, DatumNabavke, PosebneNapomene, Smjestaj });

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
        if (!zivotinja) {
            return res.status(404).send('Životinja nije pronađena.');
        }
        res.render('zivotinje/edit', { zivotinja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o životinji
router.put('/:id', async (req, res) => {
    const { Ime, DatumRodjenja, ZemljaPodrijetla, DatumNabavke, PosebneNapomene, Smjestaj } = req.body;
    try {
        const updatedZivotinja = await Zivotinje.findByIdAndUpdate(req.params.id, { Ime, DatumRodjenja, ZemljaPodrijetla, DatumNabavke, PosebneNapomene, Smjestaj }, { new: true });
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
