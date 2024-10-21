const express = require('express');
const router = express.Router();
const Siswa = require('../models/Siswa');

// Menampilkan ranking siswa
router.get('/', (req, res) => {
    Siswa.find().sort({ nilai: -1 }).exec((err, siswa) => {
        if (err) return res.status(500).send(err);
        res.render('siswa', { siswa });
    });
});

module.exports = router;
