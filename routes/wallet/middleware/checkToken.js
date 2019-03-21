const {UserRepositories} = require('../../../bin/Repositories/index');


const isToken = async function (req, res, next) {
    console.log('_________!!!!!!!!!!!!!__________________');
    console.log(req, req.body, req.body.token);
    console.log('_________!!!!!!!!!!!!!__________________');

    if (!Object.values(req.body).length) {
        return res.send(304, 'Body is empty');
    }

    let isToken = await UserRepositories.isToken(req.body.token);
    if (isToken) {
        next()
    } else {
        return res.send(304, 'Token is Invalid');
    }
};


module.exports = {isToken}
