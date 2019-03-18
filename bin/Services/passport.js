'use strict';

var passport = require('passport'),
    TwitterTokenStrategy = require('passport-twitter-token');

module.exports = function () {

    passport.use(new TwitterTokenStrategy({
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            includeEmail: true
        },
        function (token, tokenSecret, profile, done) {
            console.log(token, tokenSecret, profile, done);
        }));

};
