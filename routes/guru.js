const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ranking = require('../models/Ranking')
const { isAuthenticated } = require('../middleware/auth');
const { 
    normalizeScores, 
    calculateFinalScores, 
    rankStudents 
} = require('../controllers/rankingController'); 

router.use(express.json());

router.get('/dashboard',async (req, res) => {

    try{
        const siswaList = await User.find({role:'siswa'});
        const students = await Ranking.find(); // Fetch data from Ranking model
        const normalizedStudents = normalizeScores(students);
        const studentsWithScores =await calculateFinalScores(normalizedStudents);
        const rankedStudents = rankStudents(studentsWithScores);
        res.render('guru/dashboard', { siswaList,students: rankedStudents });
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
        res.status(500).send('server error')
    }
});

router.post('/update-nilai/:id', async (req, res) => {
    const siswaId = req.params.id;
    const { nilai_uts, nilai_uas, nilai_ibadah, nilai_praktek, nilai_absensi, nilai_tugas } = req.body;
  
    try {
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

router.post('/push-ranking-data',async (req, res) => {
    const rankingData = req.body;
    
    await Ranking.insertMany(rankingData)
      .then(() => res.json({ success: true }))
      .catch(err => res.json({ success: false, error: err.message }));
    });
module.exports = router;
