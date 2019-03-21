var express = require('express');
var router = express.Router();
const passport = require('passport');

router.use((req, res, next) => {
    req.session.socketId = req.query.socketId
    next()
})

/* GET users listing. */
router.get('/auth_twitter', passport.authenticate('twitter', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        const io = req.app.get('io')
        console.error('All right')
        console.log(io);
        console.error('All right');
        io.emit('twitter', 'test1_1');
        console.error(req.session.socketId);
        io.in(req.session.socketId).emit('twitter', 'test2');
        //req.app.io.in(req.session.socketId).emit('twitter', req.user); //.in(req.session.socketId)
        res.end()
        //res.redirect('/');
    });

router.get('/twitter', passport.authenticate('twitter', {session: false}));

module.exports = router;
