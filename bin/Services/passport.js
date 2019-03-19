'use strict';

var UserRepositories = require('../Repositories/index');
var passport = require('passport'),
    TwitterTokenStrategy = require('passport-twitter-token');

module.exports = function () {

    passport.use(new TwitterTokenStrategy({
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            includeEmail: true,
            callbackURL: "https://wallet.primecore.io/auth_twitter"
        },
        function (token, tokenSecret, profile, done) {
            if (!UserRepositories.has(profile.id)) {
                UserRepositories.create(profile);
            }

            let user = UserRepositories.findByTwiterId(profile.id);
            let err = null;
            console.log('_______________________---');
            console.log(user);
            console.log('_______________________---');
            return done(err, user);
        }));

};
