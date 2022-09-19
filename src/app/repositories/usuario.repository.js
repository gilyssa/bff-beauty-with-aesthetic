//ultima camada
// funções que fazem alterações no banco
const { Usuario } = require('../../database/models/index');

//adicionando um novo usuário
const criar = async function (usuario) {
  const usuarioCriado = await Usuario.create(usuario);
  return usuarioCriado;
};

//atualizando cadastro de algum usuário
const atualizar = async function (usuario, id) {
  await Usuario.update(usuario, {
    where: { id: id },
  });
};

const atualizarPorCodigo = async function (usuario, codigo) {
  await Usuario.update(usuario, {
    where: { codigo: codigo },
  });
};

const atualizarEmail = async function (usuario, email) {
  await Usuario.update(usuario, {
    where: { email: email.email },
  });
};

//listar todos os usuários
const encontrarTodos = async function () {
  const usuarios = await Usuario.findAll();
  return usuarios;
};

//encontrar usuário por ID
const encontrarPorId = async function (id) {
  const usuario = await Usuario.findByPk(id);
  return usuario;
};

//listar usuário pelo where
const encontrarUmPorWhere = async function (where) {
  const usuario = await Usuario.findOne({
    where: where,
  });
  return usuario;
};

//remover usuario
const deletar = async function (id) {
  return await Usuario.destroy({ where: { id: id } });
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  encontrarUmPorWhere: encontrarUmPorWhere,
  deletar: deletar,
  atualizarEmail: atualizarEmail,
  atualizarPorCodigo: atualizarPorCodigo,
};
