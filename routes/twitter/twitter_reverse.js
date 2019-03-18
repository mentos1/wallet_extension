var express = require('express');
var router = express.Router();
const twitterConfig = require('../../bin/Services/twitter.config');

/* GET users listing. */
router.post(function(req, res) {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
            consumer_key: twitterConfig.consumerKey,
            consumer_secret: twitterConfig.consumerSecret
        }
    }, function (err, r, body) {
        if (err) {
            return res.send(500, { message: err.message });
        }


        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        res.send(JSON.parse(jsonStr));
    });
});

module.exports = router;
