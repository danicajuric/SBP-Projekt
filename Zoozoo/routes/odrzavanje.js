// routes/odrzavanje.js
const express = require('express');
const router = express.Router();
const Odrzavanje = require('../models/odrzavanje');
const Zaposlenici = require('../models/zaposlenici');
const Smjestaj = require('../models/smjestaj');
const VrstaOdrzavanja = require('../models/vrsta_odrzavanja');

// Prikaz svih održavanja
// Prikaz svih održavanja
router.get('/', async (req, res) => {
    try {
        const odrzavanja = await Odrzavanje.find().populate('Zaposlenik').populate('Smjestaj').populate('Vrsta_odrzavanja');
        res.render('odrzavanje/index', { odrzavanja });
    } catch (err) {
        res.status(500).send(err);
    }
});


// Dodavanje novog održavanja
router.get('/new', async (req, res) => {
    try {
        const zaposlenici = await Zaposlenici.find();
        const smjestaji = await Smjestaj.find();
        const vrsteOdrzavanja = await VrstaOdrzavanja.find();
        res.render('odrzavanje/new', { zaposlenici, smjestaji, vrsteOdrzavanja });
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post('/', async (req, res) => {
    const { Zaposlenik, Smjestaj, Datum_i_vrijeme, Vrsta_odrzavanja } = req.body;
    const novoOdrzavanje = new Odrzavanje({ Zaposlenik, Smjestaj, Datum_i_vrijeme, Vrsta_odrzavanja });

    try {
        await novoOdrzavanje.save();
        res.redirect('/odrzavanje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Prikaz forme za uređivanje održavanja
router.get('/:id/edit', async (req, res) => {
    try {
        const odrzavanje = await Odrzavanje.findById(req.params.id);
        const zaposlenici = await Zaposlenici.find();
        const smjestaji = await Smjestaj.find();
        const vrsteOdrzavanja = await VrstaOdrzavanja.find();
        if (!odrzavanje) {
            return res.status(404).send('Održavanje nije pronađeno.');
        }
        res.render('odrzavanje/edit', { odrzavanje, zaposlenici, smjestaji, vrsteOdrzavanja });
    } catch (err) {
        res.status(500).send(err);
    }
});

// Ažuriranje podataka o održavanju
router.post('/:id/edit', async (req, res) => { // Promenjen metod u POST
    const { Zaposlenik, Smjestaj, Datum_i_vrijeme, Vrsta_odrzavanja } = req.body;
    try {
        const updatedOdrzavanje = await Odrzavanje.findByIdAndUpdate(req.params.id, { Zaposlenik, Smjestaj, Datum_i_vrijeme, Vrsta_odrzavanja }, { new: true });
        if (!updatedOdrzavanje) {
            return res.status(404).send('Održavanje nije pronađeno.');
        }
        res.redirect('/odrzavanje');
    } catch (err) {
        res.status(500).send(err);
    }
});

// Brisanje održavanja
router.post('/:id/delete', async (req, res) => {
    try {
        await Odrzavanje.findByIdAndDelete(req.params.id);
        res.redirect('/odrzavanje');
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
