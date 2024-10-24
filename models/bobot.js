// models/Ranking.js
const mongoose = require('mongoose');

const bobotSchema = new mongoose.Schema({
  c1: {
    type: Number,
    required: true,
  },
  c2: {
    type: Number,
    required: true,
  },
  c3: {
    type: Number,
    required: true,
  },
  c4: {
    type: Number,
    required: true,
  },
  c5: {
    type: Number,
    required: true,
  },
  c6: {
    type: Number,
    required: true,
  },
  
});
module.exports = mongoose.model('bobot', bobotSchema);
