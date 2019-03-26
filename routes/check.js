var express = require('express');
var router = express.Router();
const {sendTweet} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', async function(req, res, next) {

    await sendTweet(
        '@den_cross87 Hello denis',
        '1083652953083396098-zGRIf0iqwqr5qTlaPCeJuhypqnWrFu',
        'HiWuwJDsChNwy7fCaA8sxGfi7n9DK1JUiljTCTY2GqTkq'
    );

    res.send({"success" : true});
});

module.exports = router;
