var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {UserRepositories} = require('../../bin/Repositories/index');
const {middleware} = require('../middleware/index');
const {getFriendsList} = require('../../bin/Services/twitter');

/* GET users listing. */
router.post('/', middleware.isToken, async function(req, res, next) {
    try {
        let user = await UserRepositories.getUserByToken(req.body.token);
        if (user) {
            console.log('________!0_______________');
            console.log(user, user.screen_name);
            console.log('________!0_______________');
            let filteredUser = await getFriendsList(user.screen_name);
                console.log('________!1_______________');
                console.log(filteredUser); //todo cat info
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
