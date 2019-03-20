var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET users listing. */
router.post('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
