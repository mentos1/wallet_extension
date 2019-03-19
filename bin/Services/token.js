const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

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
