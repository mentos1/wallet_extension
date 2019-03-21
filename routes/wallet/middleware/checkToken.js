const {UserRepositories} = require('../../../bin/Repositories/index');


const isToken = async function (req, res, next) {
    let isToken = await UserRepositories.isToken(req.body.token)
     if (isToken) {
         next()
     } else {
         return res.send(304, 'Token is Invalid');
     }
};

const addSocketIdToSession = (req, res, next) => {
    req.session.socketId = req.query.socketId;
    next()
}


module.exports = {isToken}
