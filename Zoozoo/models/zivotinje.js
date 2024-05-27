const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const zivotinjeSchema = new Schema({
    Ime: { type: String, required: true },
    Datum_rodjenj: { type: Date, required: true },
    Zemlje_podrijetla: { type: String, required: true },
    Datum_nabavke: { type: Date, required: true },
    Posebne_napomene: { type: String },
    Smjestaj: { type: Schema.Types.ObjectId, ref: 'Smjestaj', required: true }
}, { collection: 'Zivotinje' });  

module.exports = mongoose.model('Zivotinje', zivotinjeSchema);
