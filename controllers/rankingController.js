// controllers/rankingController.js
const User = require('../models/User');  // Model User

const weights = {
  nilai_uts: 0.2,    
  nilai_uas: 0.3,    
  nilai_ibadah: 0.1,  
  nilai_praktek: 0.2, 
  nilai_absensi: 0.1, 
  nilai_tugas: 0.1    
};

// Normalisasi nilai siswa
function normalizeScores(students) {
  const maxScores = {
    nilai_uts: Math.max(...students.map(student => student.nilai_uts)),
    nilai_uas: Math.max(...students.map(student => student.nilai_uas)),
    nilai_ibadah: Math.max(...students.map(student => student.nilai_ibadah)),
    nilai_praktek: Math.max(...students.map(student => student.nilai_praktek)),
    nilai_absensi: Math.max(...students.map(student => student.nilai_absensi)),
    nilai_tugas: Math.max(...students.map(student => student.nilai_tugas))
  };

  return students.map(student => {
    return {
      ...student._doc,
      normalizedScores: {
        nilai_uts: student.nilai_uts / maxScores.nilai_uts || 0,
        nilai_uas: student.nilai_uas / maxScores.nilai_uas || 0,
        nilai_ibadah: student.nilai_ibadah / maxScores.nilai_ibadah || 0,
        nilai_praktek: student.nilai_praktek / maxScores.nilai_praktek || 0,
        nilai_absensi: student.nilai_absensi / maxScores.nilai_absensi || 0,
        nilai_tugas: student.nilai_tugas / maxScores.nilai_tugas || 0
      }
    };
  });
}

// Hitung skor akhir
function calculateFinalScores(students) {
  return students.map(student => {
    const finalScore = 
      (student.normalizedScores.nilai_uts * weights.nilai_uts) +
      (student.normalizedScores.nilai_uas * weights.nilai_uas) +
      (student.normalizedScores.nilai_ibadah * weights.nilai_ibadah) +
      (student.normalizedScores.nilai_praktek * weights.nilai_praktek) +
      (student.normalizedScores.nilai_absensi * weights.nilai_absensi) +
      (student.normalizedScores.nilai_tugas * weights.nilai_tugas);

    return {
      ...student,
      finalScore: finalScore
    };
  });
}

// Urutkan siswa berdasarkan skor akhir
function rankStudents(students) {
  return students.sort((a, b) => b.finalScore - a.finalScore);
}

// Fungsi utama untuk menghitung peringkat siswa
async function rankStudentsBySAW(req, res) {
  try {
    const students = await User.find({ role: 'siswa' });
    const normalizedStudents = normalizeScores(students);
    const studentsWithScores = calculateFinalScores(normalizedStudents);
    const rankedStudents = rankStudents(studentsWithScores);

    res.render('ranking', { students: rankedStudents });  // Tampilkan hasil peringkat di view
  } catch (error) {
    console.error('Error ranking students:', error);
    res.status(500).send('Error calculating ranking');
  }
}

module.exports = {
  rankStudentsBySAW
};
