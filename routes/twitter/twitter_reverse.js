var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.error('All right')
        console.log(req.app.io);
        console.error('All right');
        req.app.io.sockets.emit('twitter', 'test2');
        //req.app.io.in(req.session.socketId).emit('twitter', req.user); //.in(req.session.socketId)
        res.end()
        //res.redirect('/');
    });

module.exports = router;
