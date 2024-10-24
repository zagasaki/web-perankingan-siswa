const express = require('express');
const router = express.Router();
const User = require('../models/User');

function redirectBasedOnRole(req, res) {

}
router.get('/login', (req, res) => {
    if (req.session.userId) {
        return redirectBasedOnRole(req, res);
    }
    res.render('login', { errorMessage: null });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.render('login', { errorMessage: "Username atau password salah" });
        }
        
        req.session.userId = user._id;
        req.session.role = user.role;

        return redirectBasedOnRole(req, res);

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
