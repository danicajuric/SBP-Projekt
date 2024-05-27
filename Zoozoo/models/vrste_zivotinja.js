const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const vrsteZivotinjaSchema = new Schema({
    Naziv: { type: String, required: true },
    Opis: { type: String }
}, { collection: 'Vrste_zivotinja' });  

module.exports = mongoose.model('Vrste_zivotinja', vrsteZivotinjaSchema);
