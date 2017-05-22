const express = require('express');
const timestamp = require('./controllers/timestampController');
const router = express.Router();


router.get('/timestamp', timestamp.homeTime);
router.get('/timestamp/:time', timestamp.resolveTime);




module.exports = router;
