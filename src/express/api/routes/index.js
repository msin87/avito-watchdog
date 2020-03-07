const router = require('express').Router({mergeParams: true});
const locationsRouter = require('./locations');
const urlsRouter = require('./urls');

router.use(locationsRouter);
router.use(urlsRouter);

module.exports = router;
