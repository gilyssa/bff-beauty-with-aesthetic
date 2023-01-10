const { Procedimento_Cliente } = require('../../database/models/index');
const { Cliente } = require('../../database/models/index');

const criar = async function (procedimento_cliente) {
  const clienteCriado = await Procedimento_Cliente.create(procedimento_cliente);
  return clienteCriado;
};

const atualizar = async function (procedimento_cliente, id) {
  await Procedimento_Cliente.update(procedimento_cliente, {
    where: { id: id },
  });
};

const encontrarTodos = async function () {
  const procedimento_clientes = await Procedimento_Cliente.findAll();
  return procedimento_clientes;
};

const encontrarPorId = async function (id) {
  const procedimento_cliente = await Procedimento_Cliente.findByPk(id);
  return procedimento_cliente;
};

const encontrarUmPorWhere = async function (where) {
  const procedimento_cliente = await Procedimento_Cliente.findOne({
    where: where,
  });
  return procedimento_cliente;
};

const encontrarPorUsuario = async function (where) {
  const procedimento_cliente = await Procedimento_Cliente.findAll({
    include: [{ model: Cliente, as: 'cliente', where: where }],
  });
  return procedimento_cliente;
};

const encontrarTodosPorWhere = async function (where) {
  const procedimento_cliente = await Procedimento_Cliente.findAll({
    where: where,
  });
  return procedimento_cliente;
};

const deletar = async function (id) {
  return await Procedimento_Cliente.destroy({ where: { id: id } });
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
