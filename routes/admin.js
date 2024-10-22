const express = require('express');
const router = express.Router();

// Route dashboard admin
router.get('/dashboard', (req, res) => {
    res.send('Ini adalah dashboard admin');
});

module.exports = router;
