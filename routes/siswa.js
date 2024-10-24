const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middleware/auth');
const { 
    normalizeScores, 
    calculateFinalScores, 
    rankStudents 
} = require('../controllers/rankingController'); // Import ranking functions
const Ranking = require('../models/Ranking');


// Route to display the student dashboard with ranking
router.get('/dashboard', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }

        // Fetch and rank students
        const students = await Ranking.find(); // Fetch data from Ranking model
        const normalizedStudents = normalizeScores(students);
        const studentsWithScores = calculateFinalScores(normalizedStudents);
        const rankedStudents = rankStudents(studentsWithScores);

        // Render the dashboard view with user and ranked students
        res.render('siswa/dashboard', { user, students: rankedStudents });
    } catch (error) {
        console.error('Error in /dashboard route:', error);
        res.status(500).send('kontol');
    }
});

// Route to display the student profile
router.get('/profile', isAuthenticated, async (req, res) => {
    try {
        const user = await User.findById(req.session.userId);
        if (!user) {
            return res.redirect('/login');
        }

        // Fetch and rank students for the profile view
        const students = await Ranking.find(); // Fetch data from Ranking model
        const normalizedStudents = normalizeScores(students);
        const studentsWithScores = calculateFinalScores(normalizedStudents);
        const rankedStudents = rankStudents(studentsWithScores);

        res.render('siswa/siswa_profile', { user, students: rankedStudents });
    } catch (error) {
        console.error('Error in /profile route:', error);
        res.status(500).send('Server error');
    }
});

module.exports = router;
