const {UserRepositories} = require('../../bin/Repositories/index');


const isToken = async function (req, res, next) {
    console.log('_________!!!!!!!!!!!!!__________________');
    console.log(req.body, req.body.token, UserRepositories);
    console.log('_________!!!!!!!!!!!!!__________________');

    if (!Object.values(req.body).length) {
        console.log('Body is empty');
        return res.send(304, 'Body is empty');
    }
    console.log(2);
    let isToken = await UserRepositories.isToken(req.body.token);
    if (isToken) {
        console.log('next');
        return next()
    } else {
        console.log('Token is Invalid');
        return res.send(304, 'Token is Invalid');
    }
};


module.exports = {isToken}
