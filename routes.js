const express = require('express');
const timestamp = require('./controllers/timestampController');
const router = express.Router();

router.get('/', (req, res) => res.render('home'));

router.get('/timestamp', timestamp.timestamp);
router.get('/timestamp/:time', timestamp.resolveTime);




module.exports = router;
