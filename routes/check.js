var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', async function (req, res, next) {
    res.send({"success": true});
});

module.exports = router;
