const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const criar = function () {
  return [
    body('procedimento_id', validatorMessage('procedimento_id'))
      .exists()
      .bail()
      .isInt(),
    body('cliente_id', validatorMessage('cliente_id')).exists().bail().isInt(),
  ];
};

const atualizar = function () {
  return [
    body('procedimento_id', validatorMessage('procedimento_id'))
      .exists()
      .bail()
      .isInt(),
    body('cliente_id', validatorMessage('cliente_id')).exists().bail().isInt(),
  ];
};

const encontrarPorId = function () {
  return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

const deletar = function () {
  return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

module.exports = {
  criar: criar,
  encontrarPorId: encontrarPorId,
  atualizar: atualizar,
  deletar: deletar,
};
