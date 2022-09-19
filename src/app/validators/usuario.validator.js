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

const atualizarNome = function () {
  return [body('nome', validatorMessage('Nome')).exists().bail().isString()];
};

const atualizarEmail = function () {
  return [body('email', validatorMessage('Email')).exists().bail().isEmail()];
};

const atualizarSenha = function () {
  return [
    body('senha', validatorMessage('Senha'))
      .exists()
      .bail()
      .isString()
      .isLength({ min: 8 }),
  ];
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

const email = function () {
  return [body('email', validatorMessage('Email')).exists().bail().isString()];
};

const recovery = function () {
  return [
    body('codigo', validatorMessage('Código')).exists().bail().isInt(),
    body('senha', validatorMessage('Senha'))
      .exists()
      .bail()
      .isString()
      .isLength({ min: 8 }),
  ];
};

module.exports = {
  criar: criar,
  encontrarPorId: encontrarPorId,
  atualizarNome: atualizarNome,
  atualizarEmail: atualizarEmail,
  atualizarSenha: atualizarSenha,
  deletar: deletar,
  login: login,
  email: email,
  recovery: recovery,
};
