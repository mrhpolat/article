var express = require('express');

var router = express.Router();

var controllerLogin= require('../controller/loginController');

router.get('/', controllerLogin.index);
router.post('/',controllerLogin.loginPost);
router.get('/signup', controllerLogin.signupGet);
router.post('/signup', controllerLogin.signupPost);
router.get('/userlist', controllerLogin.userlist);
router.get('/userdelete/:username', controllerLogin.userdelete);
router.get('/logout', controllerLogin.logout);


module.exports = router