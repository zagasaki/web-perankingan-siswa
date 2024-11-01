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

router.get('/tambahsiswa', (req, res) => {
  res.render('admin/addsiswa');
});

router.post('/add-siswa', async (req, res) => {
  try {
    const {
      username, password, nama_lengkap, jenis_kelamin, agama, tempat_tanggal_lahir,
      telepon, alamat, nis, anak_ke, nama_ayah, nama_ibu, pekerjaan_ayah,
      pekerjaan_ibu, alamat_orang_tua, kelas
    } = req.body;

    const newSiswa = new User({
      username,
      password,
      role: 'siswa',
      nama_lengkap,
      jenis_kelamin,
      agama,
      tempat_tanggal_lahir,
      telepon,
      alamat,
      nis,
      anak_ke,
      nama_ayah,
      nama_ibu,
      pekerjaan_ayah,
      pekerjaan_ibu,
      alamat_orang_tua,
      kelas
    });

    await newSiswa.save();
    res.redirect('/admin/listSiswaGuru');
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat menambahkan data siswa");
  }
});


router.get('/tambahguru', (req, res) => {
  res.render('admin/addguru');
});

router.post('/add-guru', async (req, res) => {
  try {
    const { username, password, nama_lengkap, jenis_kelamin, agama, tempat_tanggal_lahir, telepon, alamat, nip, mata_pelajaran } = req.body;

    const newGuru = new User({
      username,
      password,
      role: 'guru',
      nama_lengkap,
      jenis_kelamin,
      agama,
      tempat_tanggal_lahir,
      telepon,
      alamat,
      nip,
      mata_pelajaran
    });

    await newGuru.save();
    res.redirect('/admin/listSiswaGuru');
  } catch (error) {
    res.status(500).send("Terjadi kesalahan saat menambahkan data guru");
  }
});

  
  
module.exports = router;
