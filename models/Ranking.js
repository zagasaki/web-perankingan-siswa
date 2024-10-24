// models/Ranking.js
const mongoose = require('mongoose');

const rankingSchema = new mongoose.Schema({
  kelas: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  nilai_uts: {
    type: Number,
    required: true,
  },
  nilai_uas: {
    type: Number,
    required: true,
  },
  nilai_ibadah: {
    type: Number,
    required: true,
  },
  nilai_praktek: {
    type: Number,
    required: true,
  },
  nilai_absensi: {
    type: Number,
    required: true,
  },
  nilai_tugas: {
    type: Number,
    required: true,
  },
  nisn: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, 
});
const Ranking = mongoose.model('Ranking', rankingSchema);

module.exports = Ranking;
