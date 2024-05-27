const express = require('express');
const router = express.Router();
const Podrucja = require('../models/podrucja');

// Prikaz svih područja
router.get('/', async (req, res) => {
    try {
        const podrucja = await Podrucja.find();
        res.render('podrucja/index', { podrucja });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Prikaz forme za dodavanje novog područja
router.get('/new', (req, res) => {
    res.render('podrucja/new');
});

// Dodavanje novog područja
router.post('/', async (req, res) => {
    const { Naziv } = req.body;
    const novoPodrucje = new Podrucja({ Naziv });

    try {
        await novoPodrucje.save();
        res.redirect('/podrucja');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Prikaz forme za uređivanje područja
router.get('/:id/edit', async (req, res) => {
    try {
        const podrucje = await Podrucja.findById(req.params.id);
        if (!podrucje) {
            return res.status(404).send('Područje nije pronađeno.');
        }
        res.render('podrucja/edit', { podrucje });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Ažuriranje podataka o području
router.post('/:id', async (req, res) => {
    const { Naziv } = req.body;
    try {
        const updatedPodrucje = await Podrucja.findByIdAndUpdate(req.params.id, { Naziv }, { new: true });
        if (!updatedPodrucje) {
            return res.status(404).send('Područje nije pronađeno.');
        }
        res.redirect('/podrucja');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Brisanje područja
router.post('/:id/delete', async (req, res) => {
    try {
        const deletedPodrucje = await Podrucja.findByIdAndDelete(req.params.id);
        if (!deletedPodrucje) {
            return res.status(404).send('Područje nije pronađeno.');
        }
        res.redirect('/podrucja');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;
