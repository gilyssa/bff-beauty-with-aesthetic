const procedimentoClienteRepository = require('../repositories/procedimento_cliente.repository');
const createError = require('http-errors');
require('dotenv').config();

const criar = async function (procedimento_cliente) {
  const repositoryCriado = await procedimentoClienteRepository.criar(
    procedimento_cliente,
  );
  return repositoryCriado;
};

const atualizar = async function (procedimento_cliente, id) {
  const existeProcedimentoCliente =
    await procedimentoClienteRepository.encontrarPorId(id);

  if (!existeProcedimentoCliente) {
    return createError(
      404,
      'Esse Procedimento-Cliente não foi localizado no banco',
    );
  }

  await procedimentoClienteRepository.atualizar(procedimento_cliente, id);

  return await procedimentoClienteRepository.encontrarPorId(id);
};

const encontrarTodos = async function () {
  const procedimentos_clientes =
    await procedimentoClienteRepository.encontrarTodos();
  return procedimentos_clientes;
};

const encontrarPorId = async function (id) {
  const procedimento_cliente =
    await procedimentoClienteRepository.encontrarPorId(id);

  if (!procedimento_cliente) {
    return createError(404, 'Procedimento-Cliente não encontrado');
  }

  return procedimento_cliente;
};

const encontrarPorUsuario = async function (id) {
  const procedimento_cliente =
    await procedimentoClienteRepository.encontrarPorUsuario({
      usuario_id: id,
    });
  if (!procedimento_cliente) {
    return createError(
      404,
      'Esse usuário não cadastrou procedimentos para cliente',
    );
  }
  return procedimento_cliente;
};

const deletar = async function (id) {
  const procedimento_cliente =
    await procedimentoClienteRepository.encontrarPorId(id);

  if (!procedimento_cliente) {
    return createError(404, 'ProcedimentoCliente não encontrado');
  }

  await procedimentoClienteRepository.deletar(id);
  return procedimento_cliente;
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  deletar: deletar,
  encontrarPorUsuario: encontrarPorUsuario,
};
