const mongoose = require('mongoose');

const podrucjaSchema = new mongoose.Schema({
    Naziv: {
        type: String,
        required: true
    }
}, { collection: 'Podrucja' });

module.exports = mongoose.model('Podrucja', podrucjaSchema);
