var express = require('express');
var router = express.Router();
const {getFollowersList, getFriendsList} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({"success" : true});
});

module.exports = router;
