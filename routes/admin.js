const express = require('express');
const router = express.Router();
const User =  require('../models/User')
const Bobot = require('../models/bobot');
const {isAuthenticated} = require('../middleware/auth');

router.get('/dashboard',isAuthenticated,async (req, res) => {
    try{
        const bobot = await Bobot.findOne();
        const user = await User.findById(req.session.userId);
        if(!user){
            return res.redirect('/login');
        }
        res.render('admin/dashboard',{user,bobot});
    }catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});

router.get('/listSiswaGuru', isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId);
    const siswa = await User.find({ role: 'siswa' });
    const guru = await User.find({ role: 'guru' });

    if (!user) {
      return res.redirect('/login');
    }

    res.render('admin/listSiswaGuru', { user, siswa, guru });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.put('/updateBobot', async (req, res) => {
  const { c1, c2, c3, c4, c5, c6 } = req.body;

  try {
    // Find the single bobot entry and update the corresponding fields
    const update = await Bobot.findOneAndUpdate(
      {},
      { c1, c2, c3, c4, c5, c6 },
      { new: true, useFindAndModify: false }
    );

    if (!update) {
      return res.status(404).json({ success: false, message: 'Bobot not found' });
    }

    res.json({ success: true, message: 'Bobot updated successfully', data: update });
  } catch (error) {
    console.error('Error updating bobot:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});



  
  
module.exports = router;
