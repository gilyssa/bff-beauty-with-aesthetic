const clienteRepository = require('../repositories/cliente.repository');
const createError = require('http-errors');
require('dotenv').config();
const { decrypt, encrypt } = require('../utils/encryptDecrypt');

const criar = async function (cliente) {
  const existeCliente = await clienteRepository.encontrarUmPorWhere({
    nome: cliente.nome,
  });

  if (existeCliente) {
    return createError(409, 'Cliente já existe');
  }
  //fazendo a criptografia dos dados
  clienteNome = cliente.nome;
  clienteNomeCipher = encrypt(clienteNome);
  cliente.nome = JSON.stringify(clienteNomeCipher);

  clienteEmail = cliente.email;
  clienteEmailCipher = encrypt(clienteEmail);
  cliente.email = JSON.stringify(clienteEmailCipher);

  clienteData_nascimento = cliente.data_nascimento;
  clienteData_nascimentoCipher = encrypt(clienteData_nascimento);
  cliente.data_nascimento = JSON.stringify(clienteData_nascimentoCipher);

  cliente_CPF = cliente.cpf;
  cliente_CPFCipher = encrypt(cliente_CPF);
  cliente.cpf = JSON.stringify(cliente_CPFCipher);

  clienteTelefone = cliente.telefone;
  clienteTelefoneCipher = encrypt(clienteTelefone);
  cliente.telefone = JSON.stringify(clienteTelefoneCipher);

  clienteTipo_sanguineo = cliente.tipo_sanguineo;
  clienteTipo_sanguineoCipher = encrypt(clienteTipo_sanguineo);
  cliente.tipo_sanguineo = JSON.stringify(clienteTipo_sanguineoCipher);

  clienteAlergias = cliente.alergias;
  clienteAlergiasCipher = encrypt(clienteAlergias);
  cliente.alergias = JSON.stringify(clienteAlergiasCipher);

  //salvando no banco os dados criptografados
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
  //  clienteAlergiasDecipher = decrypt(JSON.parse(cliente.alergias));
  // cliente.alergias = clienteAlergiasDecipher;
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
