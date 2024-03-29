const { Procedimento } = require('../../database/models/index');
const { Op } = require('sequelize');

const criar = async function (procedimento) {
  const procedimentoCriado = await Procedimento.create(procedimento);
  return procedimentoCriado;
};

const atualizar = async function (procedimento, id) {
  await Procedimento.update(procedimento, {
    where: { id: id },
  });
};

const encontrarTodos = async function () {
  const procedimentos = await Procedimento.findAll();
  return procedimentos;
};

const encontrarPorId = async function (id) {
  const procedimento = await Procedimento.findByPk(id);
  return procedimento;
};

const encontrarUmPorWhere = async function (where) {
  const procedimento = await Procedimento.findOne({
    where: where,
  });
  return procedimento;
};

const encontrarPorWhere = async function (where) {
  const procedimento = await Procedimento.findAll({
    where: {
      [Op.and]: [{ usuario_id: where.usuario_id }, { nome: where.nome }],
    },
  });
  console.log(procedimento);

  return procedimento;
};

const encontrarPorUsuario = async function (where) {
  const procedimento = await Procedimento.findAll({
    where: where,
  });
  return procedimento;
};

const deletar = async function (id) {
  return await Procedimento.destroy({ where: { id: id } });
};

module.exports = {
  criar: criar,
  atualizar: atualizar,
  encontrarTodos: encontrarTodos,
  encontrarPorId: encontrarPorId,
  encontrarUmPorWhere: encontrarUmPorWhere,
  deletar: deletar,
  encontrarPorUsuario: encontrarPorUsuario,
  encontrarPorWhere: encontrarPorWhere,
};
