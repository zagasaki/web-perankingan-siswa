const express = require('express');
const router = express.Router();
const User =  require('../models/User')
const {isAuthenticated} = require('../middleware/auth');

router.get('/assets',isAuthenticated,async (req, res) => {
    return res.render('assets/logo')
});