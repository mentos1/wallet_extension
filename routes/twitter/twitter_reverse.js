var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.get('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        const io = req.app.get('io')
        console.error('All right')
        console.log(io);
        console.error('All right');
        io.emit('twitter', 'test1_1');
        console.error('after send');
        //io.in(req.session.socketId).emit('twitter', 'test2');
        //req.app.io.in(req.session.socketId).emit('twitter', req.user); //.in(req.session.socketId)
        res.end()
        //res.redirect('/');
    });

module.exports = router;
