const express = require('express');
const timestamp = require('./controllers/timestamp');
const whoami = require('./controllers/whoami');

const router = express.Router();

router.get('/', (req, res) => res.render('layout'));

router.get('/timestamp', timestamp.timestamp);
router.get('/timestamp/:time', timestamp.resolveTime);

router.get('/whoami', whoami.whoami);


module.exports = router;

//http://ifconfig.io/all.json
