//Quando é feita a requisição, o primeiro lugar onde ela passa é pelo arquivo de routes
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const verifyJWT = require('../middlewares/authorizator');
const usuarioValidator = require('../validators/usuario.validator');

//Ao chamar a rota sendo post, ou qualquer outra é analisada se ela existe e o que precisa ser feito.

//Exemplo: na requisição abaixo o cliente solicita criar um usuario no banco. Primeiramente validamos com o usuarioValidator.criar()
//após isso entramos na controller -> passa pela service -> e ao final faz a alteração no banco na repository para
router.post('/', usuarioValidator.criar(), usuarioController.criar);

router.post('/login', usuarioValidator.login(), usuarioController.login);

router.get('/', verifyJWT, usuarioController.encontrarTodos);

router.get(
  '/:id',
  verifyJWT,
  usuarioValidator.encontrarPorId(),
  usuarioController.encontrarPorId,
);

router.put(
  '/nome/:id',
  verifyJWT,
  usuarioValidator.atualizarNome(),
  usuarioController.atualizarNome,
);

router.put(
  '/email/:id',
  verifyJWT,
  usuarioValidator.atualizarEmail(),
  usuarioController.atualizarEmail,
);

router.put(
  '/senha/:id',
  verifyJWT,
  usuarioValidator.atualizarSenha(),
  usuarioController.atualizarSenha,
);

router.delete(
  '/:id',
  verifyJWT,
  usuarioValidator.deletar(),
  usuarioController.deletar,
);

router.post(
  '/recovery',
  usuarioValidator.recovery(),
  usuarioController.recovery,
);

router.post('/email', usuarioValidator.email(), usuarioController.email);

module.exports = router;
