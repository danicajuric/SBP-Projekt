const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pozicijaSchema = new Schema({
    Naziv: { type: String, required: true },
    Opis: { type: String, required: true }
}, { collection: 'Pozicija' });  

module.exports = mongoose.model('Pozicija', pozicijaSchema);
