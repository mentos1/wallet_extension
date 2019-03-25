var express = require('express');
var router = express.Router();
const {sendMsg} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', async function(req, res, next) {
    let data = await sendMsg(2269152982, 'hello from prime core', '1083652953083396098-zGRIf0iqwqr5qTlaPCeJuhypqnWrFu', 'HiWuwJDsChNwy7fCaA8sxGfi7n9DK1JUiljTCTY2GqTkq');
    console.log(data);
    res.send({"success" : data});
});

module.exports = router;
