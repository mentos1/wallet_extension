var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', passport.authenticate('twitter', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

module.exports = router;
