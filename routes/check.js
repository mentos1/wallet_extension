var express = require('express');
var router = express.Router();
const {getFollowersList, getFriendsList} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', function(req, res, next) {
    getFriendsList(1083652953083396098);
    getFollowersList(1083652953083396098);
    res.send({"success" : true});
});

module.exports = router;
