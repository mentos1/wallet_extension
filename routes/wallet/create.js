var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {create} = require('../../bin/Services/wallet');
const {middleware} = require('../middleware/index');
const {UserRepositories} = require('../../bin/Repositories/index');


/* GET users listing. */
router.post('/', middleware.isToken, async function (req, res, next) {
    try {
        let user = await UserRepositories.getUserByToken(req.body.token);
        let address = user.wallets && Object.keys(user.wallets).length ? Object.keys(user.wallets)[0] : null;

        if (address === null) {
            address = await create(req.body.token);
        }


        if (address) {
            return res.status(200).send({address})
        } else {
            return res.send(500, 'Error create Address');
        }
    } catch (e) {
        return res.send(500, 'Error create Address');
    }
});

module.exports = router;
