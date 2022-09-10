const clienteRepository = require('../repositories/cliente.repository');
const createError = require('http-errors');
require('dotenv').config();

const criar = async function (cliente) {
  const existeCliente = await clienteRepository.encontrarUmPorWhere({
    nome: cliente.nome,
  });

  if (existeCliente) {
    return createError(409, 'Cliente já existe');
  }

  const repositoryCriado = await clienteRepository.criar(cliente);
  return repositoryCriado;
};

const atualizar = async function (cliente, id) {
  const existeCliente = await clienteRepository.encontrarPorId(id);

  if (!existeCliente) {
    return createError(404, 'Usuário não existe');
  }

  await clienteRepository.atualizar(cliente, id);

  return await clienteRepository.encontrarPorId(id);
};

const encontrarTodos = async function () {
  const cliente = await clienteRepository.encontrarTodos();
  return cliente;
};

const encontrarPorId = async function (id) {
  const cliente = await clienteRepository.encontrarPorId(id);

  if (!cliente) {
    return createError(404, 'Cliente não encontrado');
  }

  return cliente;
};

const deletar = async function (id) {
  const cliente = await clienteRepository.encontrarPorId(id);

  if (!cliente) {
    return createError(404, 'Cliente não encontrado');
  }

  await clienteRepository.deletar(id);
  return cliente;
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  deletar: deletar,
};
