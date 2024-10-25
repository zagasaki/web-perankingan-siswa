// routes/logout.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // Hapus sesi pengguna
    req.session.destroy(err => {
        if (err) {
            console.error("Logout error: ", err);
            return res.redirect('/'); // Redirect jika terjadi error
        }
        res.redirect('/'); // Redirect ke halaman login setelah logout
    });
});

module.exports = router;
