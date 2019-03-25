var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {sendTransaction, createById} = require('../../bin/Services/wallet');
const {middleware} = require('../middleware/index');
const {UserRepositories} = require('../../bin/Repositories/index');

/* GET users listing. */
router.post('/', middleware.isToken, async function (req, res, next) {

    try {
        let user = await UserRepositories.getUserByToken(req.body.token);
        let user_to = await UserRepositories.findById(req.body.user_id);

        if (user_to === null) {
            await UserRepositories.createUser(req.body.user_id);
        }

        let address = await createById(req.body.user_id);
            user_to = await UserRepositories.findByTwitterId(req.body.user_id);

        let pk = user_to.wallets && Object.values(user_to.wallets).length ? Object.values(user_to.wallets)[0] : null,
            amount = req.body.amount;

        if (!amount || !address || !pk) {
            return res.status(500).send({status : 0, msg: 'Error params'})

        }

        let response = await sendTransaction(pk, address, amount);

        if (response.status) {
            return res.status(200).send({status : 1, msg: response.data})
        } else {
            return res.status(500).send({status : 0, msg: response.msg})

        }

    } catch (e) {
        return res.status(500).send({status : 0, msg: e})
    }

});


async function getAddress(user_id, res) {
    let user = await UserRepositories.findByTwitterId(user_id);

    if (user === null) {
        return res.status(500).send({status : 0, msg : 'user not found'})
    }

    user.address = user.wallets && Object.keys(user.wallets).length ? Object.keys(user.wallets)[0] : null;

    if (user.address === null) {
        let address = await createById(user_id);
        if (address) {
            return address;
        } else {
            return res.status(200).send({status : 0, msg : 'Error create Address'})
        }
    } else {
        return res.status(200).send({status : 1,  address : user.address})
    }
}

module.exports = router;
