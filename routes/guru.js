const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');


// Route dashboard guru
router.get('/dashboard', (req, res) => {
    // Data siswa yang akan ditampilkan
    const dataSiswa = [
        { kelas: '7-1', nama: 'Asep', nisn: '1234231' },
        { kelas: '7-1', nama: 'Budiono', nisn: '1234231' },
        { kelas: '7-1', nama: 'Clarisa', nisn: '1234231' },
        { kelas: '7-1', nama: 'Dempul', nisn: '1234231' },
        { kelas: '7-1', nama: 'Empang', nisn: '1234231' },
        { kelas: '7-1', nama: 'Ferans', nisn: '1234231' },
    ];

    // Render the 'kandidat.ejs' template and pass dataSiswa to it
    res.render('guru/dashboard', { dataSiswa });
});

router.get('/pengisian-nilai', (req, res) => {
    // Data nilai yang akan ditampilkan
    const dataNilai = [
        { kode: 'C1', kriteria: 'Ujian Tengah Semester', nilai: 90 },
        { kode: 'C1', kriteria: 'Ujian Akhir Semester', nilai: 74 },
        { kode: 'C1', kriteria: 'Nilai Ibadah', nilai: 50 },
        { kode: 'C1', kriteria: 'Praktek', nilai: 67 },
        { kode: 'C1', kriteria: 'Absensi', nilai: 88 },
        { kode: 'C1', kriteria: 'Tugas', nilai: 77 }
    ];

    // Render the 'pengisianNilai.ejs' template and pass dataNilai to it
    res.render('guru/pengisianNilai', { dataNilai });
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
module.exports = router;
