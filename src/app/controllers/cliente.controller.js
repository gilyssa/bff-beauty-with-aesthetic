const clienteService = require('../services/cliente.service');
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const criar = async function (req, res, next) {
  try {
    const errors = validationResult(req);
    console.log('error', errors);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await clienteService.criar(req.body);
    console.log('response', response);

    if (response && response.message) {
      throw response;
    }

    res.send({ messageResponse: 'Cliente criado com sucesso!' });
  } catch (error) {
    return next(error);
  }
};

const atualizar = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await clienteService.atualizar(req.body, req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const encontrarTodos = async function (req, res, next) {
  try {
    const response = await clienteService.encontrarTodos();
    res.send(response);
  } catch (error) {
    next(error);
  }
};

const encontrarPorId = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await clienteService.encontrarPorId(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const encontrarPorUsuario = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await clienteService.encontrarPorUsuario(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    next(error);
  }
};

const deletar = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await clienteService.deletar(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({
      messageResponse: 'Cliente Deletado',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  criar: criar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  atualizar: atualizar,
  deletar: deletar,
  encontrarPorUsuario: encontrarPorUsuario,
};
