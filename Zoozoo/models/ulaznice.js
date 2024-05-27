const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ulazniceSchema = new Schema({
    Cijena: { type: Number, required: true },
    Datum_prodaje: { type: Date, required: true },
    Zaposlenik: { type: Schema.Types.ObjectId, ref: 'Zaposlenik', required: true },
    Datum_dolaska: { type: Date, required: true }
}, { collection: 'Ulaznice' });  

module.exports = mongoose.model('Ulaznice', ulazniceSchema);
