const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  rank: { type: Number, required: true },
  scores: {
    uts: { type: Number, required: true },
    uas: { type: Number, required: true },
    ibadah: { type: Number, required: true },
    praktek: { type: Number, required: true },
    absensi: { type: Number, required: true },
    tugas: { type: Number, required: true },
  },
});

module.exports = mongoose.model('Student', studentSchema);
