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
        if (user) {
            return res.status(200).send(UserRepositories.removeSecretFields(user))
        } else {
            return res.send(500, 'Error get user');
        }
    } catch (e) {
        return res.send(500, 'Error create token');
    }
});

module.exports = router;
