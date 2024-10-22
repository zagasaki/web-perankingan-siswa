const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

// Route untuk dashboard siswa (accessible at /siswa/dashboard)
router.get('/dashboard', isAuthenticated, async (req, res) => {
    res.render('siswa/dashboard');
});

// Route untuk profile siswa
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        // Ambil data user dari database berdasarkan session userId
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }

        // Render halaman profile siswa dengan data user
        res.render('siswa/siswa_profile', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
