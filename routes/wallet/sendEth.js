var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {sendTransaction, createById} = require('../../bin/Services/wallet');
const {sendMsg} = require('../../bin/Services/twitter');
const {middleware} = require('../middleware/index');
const {UserRepositories} = require('../../bin/Repositories/index');

/* GET users listing. */
router.post('/', middleware.isToken, async function (req, res, next) {

    try {
        console.log(1);
        let user = await UserRepositories.getUserByToken(req.body.token);
        let user_to = await UserRepositories.findByTwitterId(req.body.user_id);
        let address = '';
        console.log(2);

        if (user_to === null) {
            await UserRepositories.createUser(req.body.user_id);
            address = await createById(req.body.user_id);
        } else {
            address = await getAddress(req.body.user_id, res);

        }
        console.log(address);

        let pk = user.wallets && Object.values(user.wallets).length ? Object.values(user.wallets)[0] : null,
            amount = req.body.amount;

        console.log(pk, amount);

        if (!amount || !address || !pk) {
            return res.status(500).send({status : 0, msg: 'Error params'})

        }

        let response = await sendTransaction(pk, address, amount);

        console.log(response);

        if (response.status) {
            if (user_to === null) {
                await sendMsg(
                    req.body.user_id,
                    process.env.TWITTER_MSG,
                    user.access_token_twitter,
                    user.access_token_secret_twitter
                );
            }

            return res.status(200).send({status : 1, msg: response.data})
        } else {
            return res.status(500).send({status : 0, msg: response.msg})

        }

    } catch (e) {
        console.error(e);
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
