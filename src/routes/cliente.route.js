//Quando é feita a requisição, o primeiro lugar onde ela passa é pelo arquivo de routes
const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/cliente.controller');
const verifyJWT = require('../middlewares/authorizator');
const clienteValidator = require('../validators/cliente.validator');

//Ao chamar a rota sendo post, ou qualquer outra é analisada se ela existe e o que precisa ser feito.

//Exemplo: na requisição abaixo o cliente solicita criar um usuario no banco. Primeiramente validamos com o clienteValidator.criar()
//após isso entramos na controller -> passa pela service -> e ao final faz a alteração no banco na repository para
router.post('/', verifyJWT, clienteValidator.criar(), clienteController.criar);

router.get('/', verifyJWT, clienteController.encontrarTodos);

router.get(
  '/:id',
  verifyJWT,
  clienteValidator.encontrarPorId(),
  clienteController.encontrarPorId,
);

router.put(
  '/:id',
  verifyJWT,
  clienteValidator.atualizar(),
  clienteController.atualizar,
);

router.delete(
  '/:id',
  verifyJWT,
  clienteValidator.deletar(),
  clienteController.deletar,
);

module.exports = router;
