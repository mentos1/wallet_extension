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
    //return res.status(200).send(JSON.stringify(req.user));
    let p = [];
    delete req.user["id_vk"];
    delete req.user["friends_vk"];
    delete req.user["access_token_vk"];
    delete req.user["addresses"];
    delete req.user["created_at"];
    delete req.user["updated_at"];

    for (var prop in req.user) {
        p.push(prop + "=" + req.user[prop]);
    }

    console.log(p.join('&'));

    return res.redirect('https://ikbncgaolpeahglmijkiaoklnmofdlmb.chromiumapp.org/');
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
