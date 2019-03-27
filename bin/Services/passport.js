'use strict';

var {UserRepositories} = require('../Repositories/index');
var passport = require('passport'),
    TwitterStrategy = require('passport-twitter'),
    TwitterTokenStrategy = require('passport-twitter-token');

module.exports = function () {

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


    passport.use(new TwitterStrategy({
            consumerKey: process.env.TWITTER_KEY,
            consumerSecret: process.env.TWITTER_SECRET,
            includeEmail: true,
            callbackURL: "https://wallet.primecore.io/auth_twitter"
        },
        async function(token, tokenSecret, profile, cb) {
            console.log('__________profile_____________---');
            console.log(profile);
            console.log('__________profile_____________---');

            let hasUser = await UserRepositories.has(profile._json.id);

            if (!hasUser) {
                await UserRepositories.create(profile, token, tokenSecret);
            } else {
                let user = await UserRepositories.findByTwitterId(profile._json.id);

                if (
                    !user.name ||
                    !user.email ||
                    !user.access_token_vk ||
                    !user.access_token_secret_twitter ||
                    !user.photo ||
                    !user.id_twitter_str ||
                    !user.screen_name
                ) {
                    await UserRepositories.update(profile, token, tokenSecret);
                }
            }

            let user = await UserRepositories.findByTwitterId(profile._json.id);
            let err = null;
            console.log('_______________________---');
            console.log(user);
            console.log('_______________________---');
            return cb(err, user);
        }
    ));


    passport.serializeUser((user, cb) => cb(null, user))
    passport.deserializeUser((obj, cb) => cb(null, obj))
};
