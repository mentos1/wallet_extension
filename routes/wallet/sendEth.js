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
        let address = await createById(this.body.user_id);

        let pk = user.wallets && Object.values(user.wallets).length ? Object.values(user.wallets)[0] : null,
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

module.exports = router;
