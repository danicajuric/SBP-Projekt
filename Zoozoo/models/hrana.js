const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hranaSchema = new Schema({
    Naziv: { type: String, required: true },
    Tip: { type: String, required: true },
    Kolicina: { type: Number, required: true }
}, { collection: 'Hrana' });  

module.exports = mongoose.model('Hrana', hranaSchema);

