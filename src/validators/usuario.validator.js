const { body, param } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const criar = function () {
  return [
    body('nome', validatorMessage('Nome')).exists().bail().isString(),
    body('email', validatorMessage('Email')).exists().bail().isEmail(),
    body('senha', validatorMessage('Senha'))
      .exists()
      .bail()
      .isString()
      .isLength({ min: 8 }),
  ];
};

const atualizar = function () {
  if (body('email').exists()) {
    return [
      body('email', validatorMessage('Email')).exists().bail().isEmail(),
      param('id', validatorMessage('Id')).exists().bail().isInt(),
    ];
  } else {
    return param('id', validatorMessage('Id')).exists().bail().isInt();
  }
};

const encontrarPorId = function () {
  return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

const deletar = function () {
  return [param('id', validatorMessage('Id')).exists().bail().isInt()];
};

const login = function () {
  return [
    body('email', validatorMessage('Email')).exists().bail().isString(),
    body('senha', validatorMessage('Senha')).exists().bail().isString(),
  ];
};

module.exports = {
  criar: criar,
  encontrarPorId: encontrarPorId,
  atualizar: atualizar,
  deletar: deletar,
  login: login,
};
