var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {create} = require('../../bin/Services/wallet');
const {checkToken} = require('./middleware/index');

/* GET users listing. */
router.post('/', checkToken, function(req, res, next) {
    try {
        create(req.body.token);
        return res.send(200, 'Success insert');
    } catch (e) {
        return res.send(500, 'Error create Address');
    }
});

module.exports = router;
