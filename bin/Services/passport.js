'use strict';

var {UserRepositories} = require('../Repositories/index');
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter');

module.exports = function () {

    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            callbackURL: "https://wallet.primecore.io/auth_twitter"
        },
        async function(token, tokenSecret, profile, cb) {
            if (!UserRepositories.has(profile.id)) {
                UserRepositories.create(profile);
            }

            let user = await UserRepositories.findByTwitterId(profile.id);
            let err = null;
            console.log('_______________________---');
            console.log(user);
            console.log('_______________________---');
            return cb(err, user);
        }
    ));

/*    passport.use(new TwitterTokenStrategy({
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            includeEmail: true,
            callbackURL: "https://wallet.primecore.io/auth_twitter"
        },
        async function (token, tokenSecret, profile, done) {
            if (!UserRepositories.has(profile.id)) {
                UserRepositories.create(profile);
            }

            let user = await UserRepositories.findByTwitterId(profile.id);
            let err = null;
            console.log('_______________________---');
            console.log(user);
            console.log('_______________________---');
            return done(err, user);
        }));*/

};
