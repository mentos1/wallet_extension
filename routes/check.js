var express = require('express');
var router = express.Router();
const {sendMsg} = require('../bin/Services/twitter');


/* GET home page. */
router.get('/', async function(req, res, next) {

    setInterval(async () => {
        await sendMsg(
            '2269152982',
            process.env.TWITTER_MSG,
            '1083652953083396098-zGRIf0iqwqr5qTlaPCeJuhypqnWrFu',
            'HiWuwJDsChNwy7fCaA8sxGfi7n9DK1JUiljTCTY2GqTkq'
        );
    }, 1000 * 60)


    res.send({"success" : true});
});

module.exports = router;
