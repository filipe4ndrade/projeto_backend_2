var express = require('express');
var router = express.Router();
var controllerProduto = require('../controller/controllerProduto');

router.get('/detalhes/:id', controllerProduto.detalhes);

router.get('/comprar/:id', controllerProduto.formularioCompra);

router.post('/comprar/:id', controllerProduto.processarCompra);

router.get('/dashboard', controllerProduto.dashboard);

module.exports = router;
