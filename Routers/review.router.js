var router = require('express').Router();
var ReviewCtrl = require('../Controllers/review.ctrl');

router.post('/', ReviewCtrl.save);

module.exports = router;

