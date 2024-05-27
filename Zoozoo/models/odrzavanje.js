const mongoose = require('mongoose');

const odrzavanjeSchema = new mongoose.Schema({
    Zaposlenik: { type: mongoose.Schema.Types.ObjectId, ref: 'Zaposlenici', required: true },
    Smjestaj: { type: mongoose.Schema.Types.ObjectId, ref: 'Smjestaj', required: true },
    Datum_i_vrijeme: { type: Date, required: true },
    Vrsta_odrzavanja: { type: mongoose.Schema.Types.ObjectId, ref: 'Vrsta_odrzavanja', required: true }
}, { collection: 'Odrzavanje' });

module.exports = mongoose.model('Odrzavanje', odrzavanjeSchema);
