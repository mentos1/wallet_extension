var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {UserRepositories} = require('../../bin/Repositories/index');
const {middleware} = require('../middleware/index');


/* GET users listing. */
router.post('/', middleware.isToken, async function(req, res, next) {
    try {
        let user = await UserRepositories.getUserByToken(req.body.token);
        console.log('________!_______________');
        console.log(user);
        console.log('________!_______________');
        if (user) {
            let filteredUser = await UserRepositories.removeSecretFields(user);
                console.log('________!1_______________');
                console.log(filteredUser);
                console.log('________!1_______________');
            return res.status(200).send(filteredUser);
        } else {
            return res.send(500, 'Error get user');
        }
    } catch (e) {
        return res.send(500, 'Error get user');
    }
});

module.exports = router;
