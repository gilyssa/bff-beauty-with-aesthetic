const procedimentoRepository = require('../repositories/procedimento.repository');
const createError = require('http-errors');
require('dotenv').config();

const criar = async function (procedimento) {
  const existeProcedimento = await procedimentoRepository.encontrarPorWhere({
    usuario_id: procedimento.usuario_id,
    nome: procedimento.nome,
  });

  if (existeProcedimento.length > 0) {
    return createError(409, 'Procedimento já existe');
  }

  const repositoryCriado = await procedimentoRepository.criar(procedimento);
  return repositoryCriado;
};

const atualizar = async function (procedimento, id) {
  const existeProcedimento = await procedimentoRepository.encontrarPorId(id);

  if (!existeProcedimento) {
    return createError(404, 'Procedimento não existe');
  }

  await procedimentoRepository.atualizar(procedimento, id);

  return await procedimentoRepository.encontrarPorId(id);
};

const encontrarTodos = async function () {
  const procedimentos = await procedimentoRepository.encontrarTodos();
  return procedimentos;
};

const encontrarPorId = async function (id) {
  const procedimento = await procedimentoRepository.encontrarPorId(id);

  if (!procedimento) {
    return createError(404, 'Procedimento não encontrado');
  }

  return procedimento;
};

const encontrarPorUsuario = async function (id) {
  const procedimento = await procedimentoRepository.encontrarPorUsuario({
    usuario_id: id,
  });
  if (!procedimento) {
    return createError(404, 'Esse usuário não cadastrou procedimentos');
  }

  return procedimento;
};

const deletar = async function (id) {
  const procedimento = await procedimentoRepository.encontrarPorId(id);

  if (!procedimento) {
    return createError(404, 'Procedimento não encontrado');
  }

  await procedimentoRepository.deletar(id);
  return procedimento;
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  deletar: deletar,
  encontrarPorUsuario: encontrarPorUsuario,
};
