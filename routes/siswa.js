const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

router.get('/dashboard', isAuthenticated, async (req, res) => {

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }
        res.render('siswa/dashboard', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.get('/profile', isAuthenticated, async (req, res) => {

    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }

        res.render('siswa/siswa_profile', { user });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
