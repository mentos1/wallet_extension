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
            let friends = await getFriendsList(user.screen_name, user.access_token_twitter, user.access_token_secret_twitter);
            console.log('______1______---')
            console.log(friends);
            console.log('______2______---')
            return res.status(200).send({friends});
        } else {
            return res.send(500, 'Error get user');
        }
    } catch (e) {
        return res.send(500, 'Error get user');
    }
});

module.exports = router;
