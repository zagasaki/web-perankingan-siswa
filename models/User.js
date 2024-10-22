const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  
  // Informasi umum
  nama_lengkap: { type: String, required: false },
  jenis_kelamin: { type: String, required: false },
  agama: { type: String, required: false },
  tempat_tanggal_lahir: { type: String, required: false },
  telepon: { type: String, required: false },
  alamat: { type: String, required: false },
  
  // Siswa-specific
  nis: { type: String, required: false },
  anak_ke: { type: String, required: false },
  nama_ayah: { type: String, required: false },
  nama_ibu: { type: String, required: false },
  pekerjaan_ayah: { type: String, required: false },
  pekerjaan_ibu: { type: String, required: false },
  alamat_orang_tua: { type: String, required: false },
  
  // Nilai siswa
  nilai_uts: { type: Number, required: false },
  nilai_uas: { type: Number, required: false },
  nilai_ibadah: { type: Number, required: false },
  nilai_praktek: { type: Number, required: false },
  nilai_absensi: { type: Number, required: false },
  nilai_tugas: { type: Number, required: false },

  // Guru-specific
  nip: { type: String, required: false },
  mata_pelajaran: { type: String, required: false }
});

module.exports = mongoose.model('User', userSchema);
