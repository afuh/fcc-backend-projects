const express = require('express');
const { catchErrors } = require('./errorHandlers');
const _ = require('./controllers/apiprojects');

const router = express.Router();

router.get('/', (req, res) => res.render('layout', { title: "Home" }));

router.get('/timestamp', _.timestamp);
router.get('/timestamp/:time', _.resolveTime);

router.get('/whoami', _.whoami);

router.get('/shrink', _.shrink);
router.get('/shrink/:url*', catchErrors(_.shrinkit));
router.get('/shrink-it/:id', catchErrors(_.findURL));

router.get('/images', _.images);
router.get('/images/:query', catchErrors(_.searchImages));
router.get('/latest/images', catchErrors(_.recent));

router.get('/file', _.add);
router.post('/file', _.upload, _.showSize);



module.exports = router;
