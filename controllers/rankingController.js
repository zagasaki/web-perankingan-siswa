// controllers/rankingController.js
const Ranking = require('../models/Ranking'); // Update to use the Ranking model

const weights = {
    nilai_uas: 0.25,
    nilai_uts: 0.2,
    nilai_tugas: 0.15,
    nilai_absensi: 0.15,
    nilai_praktek: 0.1,
    nilai_ibadah: 0.15,
};

// Normalize scores function
function normalizeScores(students) {
    const maxScores = {
        nilai_uts: Math.max(...students.map(student => student.nilai_uts)),
        nilai_uas: Math.max(...students.map(student => student.nilai_uas)),
        nilai_ibadah: Math.max(...students.map(student => student.nilai_ibadah)),
        nilai_praktek: Math.max(...students.map(student => student.nilai_praktek)),
        nilai_absensi: Math.max(...students.map(student => student.nilai_absensi)),
        nilai_tugas: Math.max(...students.map(student => student.nilai_tugas)),
    };

    return students.map(student => ({
        ...student._doc,
        normalizedScores: {
            nilai_uts: student.nilai_uts / maxScores.nilai_uts || 0,
            nilai_uas: student.nilai_uas / maxScores.nilai_uas || 0,
            nilai_ibadah: student.nilai_ibadah / maxScores.nilai_ibadah || 0,
            nilai_praktek: student.nilai_praktek / maxScores.nilai_praktek || 0,
            nilai_absensi: student.nilai_absensi / maxScores.nilai_absensi || 0,
            nilai_tugas: student.nilai_tugas / maxScores.nilai_tugas || 0,
        }
    }));
}

// Calculate final scores function
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
            finalScore
        };
    });
}

// Rank students function
function rankStudents(students) {
    return students.sort((a, b) => b.finalScore - a.finalScore);
}

module.exports = {
    normalizeScores,
    calculateFinalScores,
    rankStudents,
};
