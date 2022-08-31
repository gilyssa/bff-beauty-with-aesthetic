//Quando é feita a requisição, o primeiro lugar onde ela passa é pelo arquivo de routes
const express = require('express');
const router = express.Router();
const procedimentoController = require('../controllers/procedimento.controller');
//const verifyJWT = require('../middlewares/authorizator');
const procedimentoValidator = require('../validators/procedimento.validator');

//Ao chamar a rota sendo post, ou qualquer outra é analisada se ela existe e o que precisa ser feito.

//Exemplo: na requisição abaixo o cliente solicita criar um usuario no banco. Primeiramente validamos com o procedimentoValidator.criar()
//após isso entramos na controller -> passa pela service -> e ao final faz a alteração no banco na repository para
router.post('/', procedimentoValidator.criar(), procedimentoController.criar)

router.get('/',  procedimentoController.encontrarTodos)

router.get('/:id',  procedimentoValidator.encontrarPorId(), procedimentoController.encontrarPorId)

router.put('/:id',  procedimentoValidator.atualizar(), procedimentoController.atualizar)

router.delete('/:id',  procedimentoValidator.deletar(), procedimentoController.deletar)

module.exports = router;
