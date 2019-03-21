var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const io = req.app.get('socketio')
    io.emit('twitter', 'test1_1');
    res.send({"success" : true});
});

module.exports = router;
