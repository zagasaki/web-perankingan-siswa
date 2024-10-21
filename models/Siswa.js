const mongoose = require('mongoose');
const SiswaSchema = new mongoose.Schema({
    nama: String,
    nilai: Number,
});
module.exports = mongoose.model('Siswa', SiswaSchema);
