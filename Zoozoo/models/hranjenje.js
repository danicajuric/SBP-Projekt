const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hranjenjeSchema = new Schema({
    Zaposlenik: { type: Schema.Types.ObjectId, ref: 'Zaposlenici', required: true },
    Hrana: { type: Schema.Types.ObjectId, ref: 'Hrana', required: true },
    Smjestaj: { type: Schema.Types.ObjectId, ref: 'Smjestaj', required: true },
    Datum_i_vrijeme: { type: Date, required: true }
}, { collection: 'Hranjenje' });  

module.exports = mongoose.model('Hranjenje', hranjenjeSchema);
