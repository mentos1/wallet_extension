var express = require('express');
var router = express.Router();
/*const {user} = require('../bin/Request/index');
const {UserRepositories} = require('../bin/Repositories/index');*/
const {setPk} = require('../../bin/Services/wallet');
const {middleware} = require('./middleware/index');

/* GET users listing. */
router.post('/', middleware.isToken, function(req, res, next) {
    if (req.body && req.body.pk) {
        try {
            setPk(req.body.toke, req.body.pk);
            return res.send(200, 'Success insert');
        } catch (e) {
            return res.send(500, 'Error insert pk');
        }
    }
});

module.exports = router;
