var express = require('express');
var router = express.Router();
const {UserRepositories} = require('../../bin/Repositories/index');
const {middleware} = require('../middleware/index');
const {getRandomWallet} = require('../../bin/Services/wallet');
const {create, createById} = require('../../bin/Services/wallet');

/* GET users listing. */
router.post('/', middleware.isToken, async function(req, res, next) {
    try {
        let user = await UserRepositories.findByTwitterId(req.body.user_id);

        if (user === null) {
            return res.status(200).send({address : 'user haven\'t address'})
        }

        user.address = user.wallets && Object.keys(user.wallets).length ? Object.keys(user.wallets)[0] : null;

        if (user.address === null) {
            let address = await createById(user.id_twitter);
            if (address) {
                return res.status(200).send({address})
            } else {
                return res.send(500, 'Error create Address');
            }
        } else {
            return res.status(200).send({address : user.address})
        }

    } catch (e) {
        return res.send(500, 'Error create Address');
    }
});

module.exports = router;
