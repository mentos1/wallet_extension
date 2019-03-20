var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        console.error('All right')
        //console.log(SocketSingleton.io);
        console.error('All right')
        req.io.emit('twitter', req.user); //.in(req.session.socketId)
        res.end()
        //res.redirect('/');
    });

module.exports = router;
