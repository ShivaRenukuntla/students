var router = require('express').Router();
var defaultRouter = require('../Controllers/default.ctrl');

router.get('/',defaultRouter.get);
router.get('/health',defaultRouter.health);

module.exports = router;