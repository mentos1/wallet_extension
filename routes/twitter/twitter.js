const express = require('express');
let router = express.Router();
const passport = require('passport');
const Token = require('../../bin/Services/token');
const request = require('request');
const {UserRepositories} = require('../../bin/Repositories/index');
const {user} = require('../../bin/Request/index');


/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log(req.query);
    request.post({
        url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
        oauth: {
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET,
            token: req.query.oauth_token
        },
        form: { oauth_verifier: req.query.oauth_verifier }
    }, function (err, r, body) {
        if (err) {
            return res.send(500, { message: err.message });
        }

        const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';

        /*
        * {
        *   "oauth_token": "1083652953083396098-zGRIf0iqwqr5qTlaPCeJuhypqnWrFu",
        *   "oauth_token_secret": "HiWuwJDsChNwy7fCaA8sxGfi7n9DK1JUiljTCTY2GqTkq",
        *   "user_id": "1083652953083396098",
        *   "screen_name": "Artem82994509"
        * }
        * */
        const parsedBody = JSON.parse(bodyString);

        req.body['oauth_token'] = parsedBody.oauth_token;
        req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
        req.body['user_id'] = parsedBody.user_id;

        const isValid = user.isValid_Twitter(parsedBody);

        if (isValid.status) {
            if (!UserRepositories.has(parsedBody.user_id)) {
                UserRepositories.create(parsedBody);
            }

            return res.redirect('https://ikbncgaolpeahglmijkiaoklnmofdlmb.chromiumapp.org/?' + parsedBody);
        } else {
            return res.status(401).send(isValid)
        }
    });
}/*, function(req, res, next) {
    if (!req.user) {
        return res.send(401, 'User Not Authenticated');
    }

    // prepare token for API
    req.auth = {
        id: req.user.id
    };
    console.error('2');

    return next();
}, Token.generateToken, Token.sendToken*/);

module.exports = router;
