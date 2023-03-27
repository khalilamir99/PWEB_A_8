const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();

router.get('/',( req, res) => {
    res.render('../view/login')
});

router.get('/register',( req, res) => {
    res.render('../view/register')
});

router.get('/home', authController.isLoggedIn, ( req, res) => {
    
    if( req.user ) {
      res.render('../view/dashboard', {
        user: req.user
      })
    }else{
        res.redirect('/');
    }
    
});

router.get('/profil', authController.isLoggedIn, ( req, res) => {
    
    if( req.user ) {
      res.render('../view/profil', {
        user: req.user
      })
    }else{
        res.redirect('/');
    }
    
});

router.get('/tugas', authController.isLoggedIn, ( req, res) => {
    
    if( req.user ) {
      res.render('../view/tugas', {
        user: req.user
      })
    }else{
        res.redirect('/');
    }
    
});

router.get('/pendaftaran', authController.isLoggedIn, ( req, res) => {
    
    if( req.user ) {
      res.render('../view/pendaftaran', {
        user: req.user
      })
    }else{
        res.redirect('/');
    }
    
});



module.exports = router;


