//Quando é feita a requisição, o primeiro lugar onde ela passa é pelo arquivo de routes
const express = require('express');
const router = express.Router();
const procedimentoClienteController = require('../controllers/procedimento_cliente.controller');
const verifyJWT = require('../middlewares/authorizator');
const procedimentoClienteValidator = require('../validators/procedimento_cliente.validator');

//Ao chamar a rota sendo post, ou qualquer outra é analisada se ela existe e o que precisa ser feito.

//Exemplo: na requisição abaixo o cliente solicita criar um usuario no banco. Primeiramente validamos com o procedimentoClienteValidator.criar()
//após isso entramos na controller -> passa pela service -> e ao final faz a alteração no banco na repository para
router.post(
  '/',
  verifyJWT,
  procedimentoClienteValidator.criar(),
  procedimentoClienteController.criar,
);

router.get('/', verifyJWT, procedimentoClienteController.encontrarTodos);

router.get(
  '/:id',
  verifyJWT,
  procedimentoClienteValidator.encontrarPorId(),
  procedimentoClienteController.encontrarPorId,
);

router.get(
  '/usuario/:id',
  procedimentoClienteValidator.encontrarPorId(),
  procedimentoClienteController.encontrarPorUsuario,
);

router.put(
  '/:id',
  verifyJWT,
  procedimentoClienteValidator.atualizar(),
  procedimentoClienteController.atualizar,
);

router.delete(
  '/:id',
  verifyJWT,
  procedimentoClienteValidator.deletar(),
  procedimentoClienteController.deletar,
);

module.exports = router;
