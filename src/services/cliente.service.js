const clienteRepository = require('../repositories/cliente.repository');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcrypt');

const criar = async function (cliente) {
  const existeCliente = await clienteRepository.encontrarUmPorWhere({
    nome: cliente.nome,
  });

  if (existeCliente) {
    return createError(409, 'Cliente já existe');
  }
  cliente.nome = await bcrypt.hash(cliente.nome, ~~process.env.SALT);
  cliente.email = await bcrypt.hash(cliente.email, ~~process.env.SALT);
  cliente.data_nascimento = await bcrypt.hash(
    cliente.data_nascimento,
    ~~process.env.SALT,
  );
  cliente.cpf = await bcrypt.hash(cliente.cpf, ~~process.env.SALT);
  cliente.telefone = await bcrypt.hash(cliente.telefone, ~~process.env.SALT);
  cliente.tipo_sanguineo = await bcrypt.hash(
    cliente.tipo_sanguineo,
    ~~process.env.SALT,
  );
  cliente.alergias = await bcrypt.hash(cliente.alergias, ~~process.env.SALT);

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
