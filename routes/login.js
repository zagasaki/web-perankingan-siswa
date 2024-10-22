// routes/login.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import model User

// Route untuk menampilkan halaman login
router.get('/login', (req, res) => {
    // Periksa apakah session userId ada
    if (req.session.userId) {
        // Jika sudah login, arahkan ke dashboard berdasarkan role
        return res.redirect(`/siswa/dashboard`); // Ganti sesuai dengan role pengguna
    }
    res.render('login', { errorMessage: null }); // Render halaman login.ejs
});

// Route untuk menangani request login POST
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Cari user berdasarkan username dan password
        const user = await User.findOne({ username, password });

        if (!user) {
            // Jika tidak ditemukan user dengan username dan password tersebut
            return res.render('login', { errorMessage: "Username atau password salah" });
        }

        // Simpan userId dan role di session
        req.session.userId = user._id;
        req.session.role = user.role;

        // Cek role pengguna
        if (user.role === 'siswa') {
            // Redirect ke dashboard siswa
            return res.redirect('/siswa/dashboard');
        } else if (user.role === 'guru') {
            // Redirect ke dashboard guru
            return res.redirect('/guru/dashboard');
        } else if (user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        } else {
            // Jika role tidak dikenali (opsional)
            return res.status(400).send('Role tidak dikenali');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
