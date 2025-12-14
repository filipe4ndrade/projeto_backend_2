var express = require('express');
var router = express.Router();
var controllerPedido = require('../controller/controllerPedido');

router.get('/gerenciar', controllerPedido.listarPedidos);

router.get('/alterar/:id/:status', controllerPedido.alterarStatus);

module.exports = router;
