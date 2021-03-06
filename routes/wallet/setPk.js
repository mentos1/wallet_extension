var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {setPk} = require('../../bin/Services/wallet');
const {middleware} = require('../middleware/index');
const {UserRepositories} = require('../../bin/Repositories/index');

/* GET users listing. */
router.post('/', middleware.isToken, async function(req, res, next) {
    if (req.body && req.body.pk) {
        try {
            let user = await UserRepositories.getUserByToken(req.body.token);
            let address = user.wallets && Object.keys(user.wallets).length ? Object.keys(user.wallets)[0] : null;

            if (address === null) {
                address = await setPk(req.body.token, req.body.pk);
            }

            if (address) {
                return res.status(200).send({address})
            } else {
                return res.send(500, 'Error insert pk');
            }
        } catch (e) {
            return res.send(500, 'Error insert pk');
        }
    }
});

module.exports = router;
