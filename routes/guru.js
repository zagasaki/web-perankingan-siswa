const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');

router.use(express.json());

// Route dashboard guru
router.get('/dashboard',async (req, res) => {

    try{
        const siswaList = await User.find({role:'siswa'});
        res.render('guru/dashboard', { siswaList });
    }catch (error){
        console.log(error);
        res.status(500).send('server error')
    }

});

router.get('/list_siswa',async (req, res) => {
    try{
        const siswaList = await User.find({role:'siswa'});
        res.render('guru/list_siswa', { siswaList });
    }catch (error){
        console.log(error);
        res.status(500).send('server error')
    }

    
});

router.get('/profile',isAuthenticated, async (req, res) => {
    try{
        const user = await User.findById(req.session.userId);
        if(!user){
            return res.redirect('/login');
        }

        res.render('guru/profile',{user});
    }catch(error){
        console.log(error);
        res.status(500).send('profile under construction')
    }
});

router.post('/update-nilai/:id', async (req, res) => {
    const siswaId = req.params.id;
    const { nilai_uts, nilai_uas, nilai_ibadah, nilai_praktek, nilai_absensi, nilai_tugas } = req.body;
  
    try {
      // Cari siswa berdasarkan ID dan update nilainya
      await User.findByIdAndUpdate(siswaId, {
        nilai_uts: nilai_uts,
        nilai_uas: nilai_uas,
        nilai_ibadah: nilai_ibadah,
        nilai_praktek: nilai_praktek,
        nilai_absensi: nilai_absensi,
        nilai_tugas: nilai_tugas
      });
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error updating student data:', error);
      res.json({ success: false });
    }
  });
module.exports = router;
