const {UserRepositories} = require('../../../bin/Repositories/index');


const isToken = async function (req, res, next) {
    let isToken = await UserRepositories.isToken(req.body.token)
     if (isToken) {
         next()
     } else {
         return res.send(304, 'Token is Invalid');
     }
};


module.exports = {isToken}
