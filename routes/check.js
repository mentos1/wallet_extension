var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const io = req.app.get('io')
    console.error('All right')
    console.log(io);
    console.error('All right');
    io.emit('twitter', 'test1_1_3');
    res.send({"success" : true});
});

module.exports = router;
