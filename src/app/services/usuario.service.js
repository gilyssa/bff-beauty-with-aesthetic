//Penultima camada
//regra de negocio
const usuarioRepository = require('../repositories/usuario.repository');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcrypt');
const { sign } = require('jsonwebtoken');
const { sendEmail } = require('../../modules/sendgrid/sent');

const criar = async function (usuario) {
  const existeUsuario = await usuarioRepository.encontrarUmPorWhere({
    email: usuario.email,
  });

  if (existeUsuario) {
    return createError(409, 'Usuário já existe');
  }

  usuario.senha = await bcrypt.hash(usuario.senha, ~~process.env.SALT);
  const usuarioCriado = await usuarioRepository.criar(usuario);

  return {
    id: usuarioCriado.id,
    usuario: usuarioCriado.email,
    createdAt: usuarioCriado.createdAt,
    messageAprove: 'Usuario adicionado com sucesso',
  };
};

const login = async function (usuario) {
  const usuarioLogin = await usuarioRepository.encontrarUmPorWhere({
    email: usuario.email,
  });

  if (!usuarioLogin) {
    return createError(401, 'Usuário inválido');
  }

  const comparacaoSenha = await bcrypt.compare(
    usuario.senha,
    usuarioLogin.senha,
  );

  if (!comparacaoSenha) {
    return createError(401, 'Usuário inválido');
  }

  const token = sign(
    {
      id: usuarioLogin.id,
    },
    process.env.SECRET,
    { expiresIn: 3600 },
  );
  // 1 hora 3600

  delete usuarioLogin.senha;

  const data = new Date().toLocaleString();

  return {
    auth: true,
    usuario: usuarioLogin.id,
    token: token,
    dataEmissao: data,
  };
};

const atualizarNome = async function (usuario, id) {
  const existeUsuario = await usuarioRepository.encontrarPorId(id);

  if (!existeUsuario) {
    return createError(404, 'Usuário não existe');
  }

  await usuarioRepository.atualizar(usuario, id);

  return await usuarioRepository.encontrarPorId(id);
};

const atualizarEmail = async function (usuario, id) {
  const existeUsuario = await usuarioRepository.encontrarPorId(id);

  if (!existeUsuario) {
    return createError(404, 'Usuário não existe');
  }

  await usuarioRepository.atualizar(usuario, id);

  return await usuarioRepository.encontrarPorId(id);
};

const atualizarSenha = async function (usuario, id) {
  const existeUsuario = await usuarioRepository.encontrarPorId(id);

  if (!existeUsuario) {
    return createError(404, 'Usuário não existe');
  }

  usuario.senha = await bcrypt.hash(usuario.senha, ~~process.env.SALT);
  await usuarioRepository.atualizar(usuario, id);

  return await usuarioRepository.encontrarPorId(id);
};

const email = async function (usuario) {
  const existeUsuario = await usuarioRepository.encontrarUmPorWhere({
    email: usuario.email,
  });

  if (!existeUsuario) {
    return createError(404, 'Usuário não existe');
  }

  let getRandom = Math.floor(Math.random() * (999999 - 100000) + 100000);

  if (Math.sign(getRandom) === -1) {
    getRandom = getRandom * -1;
  }

  let codigo = {
    codigo: getRandom,
  };

  console.log(getRandom);

  await usuarioRepository.atualizarEmail(codigo, usuario);
  sendEmail(usuario, getRandom);

  return {
    messageAprove: 'Email enviado com sucesso.',
  };
};

const recovery = async function (usuario) {
  const existeUsuario = await usuarioRepository.encontrarUmPorWhere({
    codigo: usuario.codigo,
  });

  if (!existeUsuario) {
    return createError(404, 'Código Inválido');
  }

  let usuarioSenha = {
    senha: await bcrypt.hash(usuario.senha, ~~process.env.SALT),
  };

  await usuarioRepository.atualizarPorCodigo(usuarioSenha, usuario.codigo);

  let limparCodigo = {
    codigo: null,
  };

  await usuarioRepository.atualizarPorCodigo(limparCodigo, usuario.codigo);

  return {
    messageAprove: 'Senha alterada com sucesso, retorne ao login',
  };
};

const encontrarTodos = async function () {
  const usuarios = await usuarioRepository.encontrarTodos();
  return usuarios;
};

const encontrarPorId = async function (id) {
  const usuario = await usuarioRepository.encontrarPorId(id);

  if (!usuario) {
    return createError(404, 'Usuário não encontrado');
  }

  return usuario;
};

const deletar = async function (id) {
  const usuario = await usuarioRepository.encontrarPorId(id);

  if (!usuario) {
    return createError(404, 'Usuário não encontrado');
  }

  await usuarioRepository.deletar(id);
  return usuario;
};

module.exports = {
  criar: criar,
  atualizarNome: atualizarNome,
  atualizarEmail: atualizarEmail,
  atualizarSenha: atualizarSenha,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  deletar: deletar,
  login: login,
  email: email,
  recovery: recovery,
};
