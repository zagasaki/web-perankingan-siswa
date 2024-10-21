const express = require('express');
const router = express.Router();
const Siswa = require('../models/Siswa');

// Guru memberikan nilai
router.post('/beri-nilai', (req, res) => {
    const { siswaId, nilai } = req.body;
    Siswa.findByIdAndUpdate(siswaId, { nilai }, (err) => {
        if (err) return res.status(500).send(err);
        res.redirect('/guru');
    });
});

module.exports = router;
