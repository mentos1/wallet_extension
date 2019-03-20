var express = require('express');
var router = express.Router();
const passport = require('passport');
const io = express().get('io');

/* GET users listing. */
router.get('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.error('All right')
        console.error(req.session.socketId);
        console.error(req.user);
        console.error(io);
        console.error('All right')
        io.in(req.session.socketId).emit('user', req.user)
        res.end()
        //res.redirect('/');
    });

module.exports = router;
