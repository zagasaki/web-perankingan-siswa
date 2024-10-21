const express = require('express');
const router = express.Router();
const Siswa = require('../models/Siswa');
const Guru = require('../models/Guru');

// Admin menambahkan data siswa
router.post('/tambah-siswa', (req, res) => {
    const { nama, nilai } = req.body;
    const siswaBaru = new Siswa({ nama, nilai });
    siswaBaru.save((err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/admin');
    });
});

// Admin menambahkan data guru
router.post('/tambah-guru', (req, res) => {
    const { nama, mataPelajaran } = req.body;
    const guruBaru = new Guru({ nama, mataPelajaran });
    guruBaru.save((err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/admin');
    });
});

module.exports = router;
