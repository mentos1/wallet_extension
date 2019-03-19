const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const url = require('url');

var createToken = function (auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

var generate = function (req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

var send = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));

/*    let p = [];

    for (let prop in req.user) {
        p.push(prop + "=" + req.user[prop]);
    }

    console.log(p.json('&'));*/

    //return res.redirect('https://ikbncgaolpeahglmijkiaoklnmofdlmb.chromiumapp.org/?id=1');
};

//token handling middleware
var authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

module.exports = {generate, send}
