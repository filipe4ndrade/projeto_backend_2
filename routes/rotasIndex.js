var express = require('express');
var router = express.Router();
var controllerIndex = require('../controller/controllerIndex');

router.get('/', controllerIndex.index);

router.get('/povoar', controllerIndex.povoarBanco);

module.exports = router;
