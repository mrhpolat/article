var express = require('express');

var router= express.Router();

var controllerLogin =require('../controller/homeController');

router.get('/', controllerLogin.index);

module.exports = router;