const express = require('express');
let router = express.Router();
const passport = require('passport');
const Token = require('../../bin/Services/token');
const request = require('request');

/* GET users listing. */
router.post('/', (req, res, next) => {
    console.log(req.body);
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET,
            token: req.body.oauth_token
        },
        form: { oauth_verifier: req.body.oauth_verifier }
    }, function (err, r, body) {
        if (err) {
            return res.send(500, { message: err.message });
        }

        console.log(body);
        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        console.log(bodyString);
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        next();
    });
}, passport.authenticate('twitter-token', {session: false}), function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
        id: req.user.id
    };

    return next();
}, Token.generateToken, Token.sendToken);

module.exports = router;
