const mongoose = require('mongoose');
const GuruSchema = new mongoose.Schema({
    nama: String,
    mataPelajaran: String,
});
module.exports = mongoose.model('Guru', GuruSchema);
