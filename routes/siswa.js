// routes/siswa.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Route for dashboard (this will be accessible at /siswa/dashboard)
router.get('/dashboard', async (req, res) => {
  try {
    const students = await Student.find().sort({ rank: 1 });
    res.render('siswa/siswa', { students });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});



module.exports = router;
