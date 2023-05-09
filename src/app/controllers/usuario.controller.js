const usuarioService = require('../services/usuario.service');
const { validationResult } = require('express-validator');
const createError = require('http-errors');

const criar = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.criar(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const login = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.login(req.body);

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const atualizarNome = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.atualizarNome(
      {
        nome: req.body.nome,
      },
      req.params.id,
    );

    if (response && response.message) {
      throw response;
    }

    res.send({
      nome: response.nome,
      messageResponse: 'Nome alterado',
    });
  } catch (error) {
    return next(error);
  }
};

const atualizarEmail = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.atualizarEmail(
      {
        email: req.body.email,
      },
      req.params.id,
    );

    if (response && response.message) {
      throw response;
    }

    res.send({
      email: response.email,
      messageResponse: 'Email alterado',
    });
  } catch (error) {
    return next(error);
  }
};

const atualizarSenha = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.atualizarSenha(
      {
        senha: req.body.senha,
      },
      req.params.id,
    );

    if (response && response.message) {
      throw response;
    }

    res.send({
      messageResponse: 'Senha alterada',
    });
  } catch (error) {
    return next(error);
  }
};

const encontrarTodos = async function (req, res, next) {
  try {
    const response = await usuarioService.encontrarTodos();
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

    const response = await usuarioService.encontrarPorId(req.params.id);

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

    const response = await usuarioService.deletar(req.params.id);

    if (response && response.message) {
      throw response;
    }

    res.send({
      email: response.email,
      messageResponse: 'Usuário Deletado',
    });
  } catch (error) {
    next(error);
  }
};

const email = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.email({
      email: req.body.email,
    });

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

const recovery = async function (req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw createError(422, {
        errors: errors.array(),
      });
    }

    const response = await usuarioService.recovery({
      codigo: req.body.codigo,
      senha: req.body.senha,
    });

    if (response && response.message) {
      throw response;
    }

    res.send(response);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  criar: criar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  atualizarNome: atualizarNome,
  atualizarEmail: atualizarEmail,
  atualizarSenha: atualizarSenha,
  deletar: deletar,
  login: login,
  email: email,
  recovery: recovery,
};
