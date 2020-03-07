const router = require('express').Router();
const locationsController = require('../controllers/locations');

router.get('/slocation', locationsController.searchRuLocation);
module.exports = router;