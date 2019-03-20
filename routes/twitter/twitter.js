const express = require('express');
let router = express.Router();
const passport = require('passport');


/* GET users listing. */
router.get('/', passport.authenticate('twitter'));

module.exports = router;
