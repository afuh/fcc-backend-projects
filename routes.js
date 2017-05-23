const express = require('express');
const { catchErrors } = require('./errorHandlers');
const _ = require('./controllers/apiprojects');

const router = express.Router();

router.get('/', (req, res) => res.render('layout'));

router.get('/timestamp', _.timestamp);
router.get('/timestamp/:time', _.resolveTime);

router.get('/whoami', _.whoami);

router.get('/shrink', _.shrink);
router.get('/shrink/:url*', catchErrors(_.shrinkit));
router.get('/shrink-it/:id', catchErrors(_.findURL));


module.exports = router;
