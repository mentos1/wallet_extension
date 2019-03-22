var express = require('express');
var router = express.Router();
const {getFriends} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', function(req, res, next) {
    getFriends(1083652953083396098);
    res.send({"success" : true});
});

module.exports = router;
