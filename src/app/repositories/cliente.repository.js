const { Cliente } = require('../../database/models/index');

const criar = async function (cliente) {
  const clienteCriado = await Cliente.create(cliente);
  return clienteCriado;
};

const atualizar = async function (cliente, id) {
  await Cliente.update(cliente, {
    where: { id: id },
  });
};

const encontrarTodos = async function () {
  const clientes = await Cliente.findAll();
  return clientes;
};

const encontrarPorId = async function (id) {
  const cliente = await Cliente.findByPk(id);
  return cliente;
};

const encontrarUmPorWhere = async function (where) {
  const cliente = await Cliente.findOne({
    where: where,
  });
  return cliente;
};

const encontrarPorUsuario = async function (where) {
  const cliente = await Cliente.findAll({
    where: where,
  });
  return cliente;
};

const encontrarTodosPorWhere = async function (where) {
  const cliente = await Cliente.findAll({
    where: where,
  });
  return cliente;
};

const deletar = async function (id) {
  return await Cliente.destroy({ where: { id: id } });
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  encontrarUmPorWhere: encontrarUmPorWhere,
  deletar: deletar,
  encontrarTodosPorWhere: encontrarTodosPorWhere,
  encontrarPorUsuario: encontrarPorUsuario,
};
