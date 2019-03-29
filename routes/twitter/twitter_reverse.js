var express = require('express');
var router = express.Router();
const passport = require('passport');
const {UserRepositories} = require('../../bin/Repositories/index');
const {logout} = require('../../bin/Services/twitter');
const {middleware} = require('../middleware/index');

const addSocketIdToSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next()
}

/* GET users listing. */
router.get('/auth_twitter', passport.authenticate('twitter', {failureRedirect: '/login'}),
    (req, res) => {
        // Successful authentication, redirect home.
        /*const io = req.app.get('socketio')
        console.error('All right')
        console.log(io);
        console.error('All right');
        io.emit('twitter', 'test1_1');
        console.error(req.session.socketId);
        io.in(req.session.socketId).emit('twitter', 'test2');*/
        //req.app.io.in(req.session.socketId).emit('twitter', req.user); //.in(req.session.socketId)
        //res.end()

        console.log('++_________________-==')
        console.log(req.user.id, req.session.socketId)
        console.log('++_________________-==')

        UserRepositories.updateToken(req.user.id, req.session.socketId);
        console.log(req.user, req.session.socketId);
        res.redirect('/');

    });

router.get('/twitter', addSocketIdToSession, passport.authenticate('twitter'));

// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
