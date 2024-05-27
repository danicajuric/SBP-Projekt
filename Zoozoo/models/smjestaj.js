const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smjestajSchema = new Schema({
    Naziv: { type: String, required: true },
    Kapacitet: { type: Number, required: true },
    Podrucje: { type: Schema.Types.ObjectId, ref: 'Podrucja', required: true }
}, { collection: 'Smjestaj' });  

module.exports = mongoose.model('Smjestaj', smjestajSchema);
