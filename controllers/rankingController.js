// controllers/rankingController.js
const Bobot = require('../models/bobot');

// Fungsi untuk mendapatkan bobot dari database
async function getWeights() {
    try {
        // Mengambil data bobot pertama (asumsi hanya ada satu)
        const bobot = await Bobot.findOne();
        if (!bobot) {
            throw new Error('Bobot tidak ditemukan di database.');
        }

        return {
            nilai_uts: bobot.c1,
            nilai_uas: bobot.c2,
            nilai_tugas: bobot.c3,
            nilai_absensi: bobot.c4,
            nilai_praktek: bobot.c5,
            nilai_ibadah: bobot.c6,
        };
    } catch (error) {
        console.error('Error fetching weights:', error);
        throw error; // Lanjutkan error agar bisa ditangani oleh caller
    }
}

// Fungsi untuk menghitung nilai akhir
async function calculateFinalScores(students) {
    try {
        const weights = await getWeights();

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
    } catch (error) {
        console.error('Error calculating final scores:', error);
        throw error; // Lanjutkan error agar bisa ditangani oleh caller
    }
}

// Fungsi normalisasi tetap sama
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

// Fungsi ranking tetap sama
function rankStudents(students) {
    return students.sort((a, b) => b.finalScore - a.finalScore);
}

module.exports = {
    normalizeScores,
    calculateFinalScores,
    rankStudents,
};
