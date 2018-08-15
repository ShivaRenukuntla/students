var router = require('express').Router();
var userCtrl = require('../Controllers/user.ctrl');
router.post('/register', userCtrl.register );
router.post('/login', userCtrl.login);

module.exports = router;
