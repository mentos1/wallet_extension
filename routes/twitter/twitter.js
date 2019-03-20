const express = require('express');
let router = express.Router();
const passport = require('passport');


/* GET users listing. */
router.get('/', passport.authenticate('twitter', {session: false}));

module.exports = router;
