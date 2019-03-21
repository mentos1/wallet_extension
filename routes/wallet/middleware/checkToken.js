const {UserRepositories} = require('../../../bin/Repositories/index');


const isToken = async function (req, res, next) {
     if (UserRepositories.isToken(req.body.token)) {
         next()
     } else {
         return res.send(304, 'Token is Invalid');
     }
};


module.exports = {isToken}
