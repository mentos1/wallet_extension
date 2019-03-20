var express = require('express');
var router = express.Router();
const passport = require('passport');
var app = require('../../app');
const io = app.get('io');

/* GET users listing. */
router.post('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.error('All right')
        console.error(req)
        console.error('All right')
        io.in(req.session.socketId).emit('user', req.user)
        res.end()
        //res.redirect('/');
    });

module.exports = router;
