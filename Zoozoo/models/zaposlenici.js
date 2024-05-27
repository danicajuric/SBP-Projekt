const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zaposleniciSchema = new Schema({
    Ime_i_prezime: { type: String, required: true },
    JMBG: { type: String, required: true },
    Datum_rodjenja: { type: Date, required: true },
    Datum_zaposlenja: { type: Date, required: true },
    Pozicija: { type: Schema.Types.ObjectId, ref: 'Pozicija', required: true }
}, { collection: 'Zaposlenici' });  

module.exports = mongoose.model('Zaposlenici', zaposleniciSchema);
