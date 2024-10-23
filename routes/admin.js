const express = require('express');
const router = express.Router();
const User =  require('../models/User')
const {isAuthenticated} = require('../middleware/auth');

router.get('/dashboard',isAuthenticated,async (req, res) => {
    try{
        const user = await User.findById(req.session.userId)
        if(!user){
            return res.redirect('/login');
        }
        res.render('admin/dashboard',{user});
    }catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
});


router.get('/editbiodata',isAuthenticated,async(req,res)=>{
    try {
        const user = await User.findById(req.session.userId);
        const siswa = await User.find({role:'siswa'});
        const guru = await User.find({role:'guru'})
        if (!user) {
            return res.redirect('/login');
        }
        res.render('admin/editbio', { user,siswa,guru });
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})
module.exports = router;
