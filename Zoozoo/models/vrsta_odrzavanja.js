const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vrstaOdrzavanjaSchema = new Schema({
    Naziv: { type: String, required: true },
    Opis: { type: String, required: true }
}, { collection: 'Vrsta_odrzavanja' });

module.exports = mongoose.model('Vrsta_odrzavanja', vrstaOdrzavanjaSchema);
