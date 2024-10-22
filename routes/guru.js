const express = require('express');
const router = express.Router();

// Route dashboard guru
router.get('/dashboard', (req, res) => {
    res.send('Ini adalah dashboard guru');
});

module.exports = router;
