const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import model User

// Route untuk menampilkan halaman login
router.get('/login', (req, res) => {
    res.render('login', { errorMessage: null });
});

// Route untuk menangani request login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari user berdasarkan username dan password
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.render('login', { errorMessage: "Username atau password salah" });
        }

        // Simpan informasi user ke dalam session
        req.session.userId = user._id;
        req.session.role = user.role;

        // Cek role pengguna dan redirect ke dashboard yang sesuai
        if (user.role === 'siswa') {
            return res.redirect('/siswa/dashboard');
        } else if (user.role === 'guru') {
            return res.redirect('/guru/dashboard');
        } else if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            return res.status(400).send('Role tidak dikenali');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
