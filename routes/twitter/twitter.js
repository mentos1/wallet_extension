const express = require('express');
let router = express.Router();
const passport = require('passport');
const request = require('request');

const addSocketIdToSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next()
}

/* GET users listing. */
router.get('/', addSocketIdToSession , passport.authenticate('twitter', {session: false}));

module.exports = router;
