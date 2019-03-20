var express = require('express');
var router = express.Router();
const request = require('request');

/* GET users listing. */
/*router.post('/', function(req, res) {
    request.post({
        url: 'https://api.twitter.com/oauth/request_token',
        oauth: {
            oauth_callback: "http%3A%2F%2Flocalhost%3A3000%2Ftwitter-callback",
            consumer_key: process.env.TWITTER_KEY,
            consumer_secret: process.env.TWITTER_SECRET
        }
    }, function (err, r, body) {
        if (err) {
            return res.send(500, { message: err.message });
        }


        var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
        console.log(jsonStr);
        res.send(JSON.parse(jsonStr));
    });
});*/
const passport = require('passport');
const twitterAuth = passport.authenticate('twitter');

router.get('/', twitterAuth, (req, res) => {
    const io = req.app.get('io');
    const user = {
        name: req.user.username,
        photo: req.user.photos[0].value.replace(/_normal/, '')
    }
    io.in(req.session.socketId).emit('twitter', user)
    res.end()
});

module.exports = router;
