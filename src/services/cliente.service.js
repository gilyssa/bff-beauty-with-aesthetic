const clienteRepository = require('../repositories/cliente.repository');
const createError = require('http-errors');
require('dotenv').config();
const { decrypt, encrypt } = require('../utils/encryptDecrypt');

const criar = async function (cliente) {
  cliente_CPF = cliente.cpf;
  cliente_CPFCipher = encrypt(cliente_CPF);
  cliente.cpf = JSON.stringify(cliente_CPFCipher);

  const existeCliente = await clienteRepository.encontrarUmPorWhere({
    cpf: cliente.cpf,
    usuario_id: cliente.usuario_id,
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
  let cliente = await clienteRepository.encontrarTodos();
  var clientesTodos = cliente.map(function (cliente) {
    clienteNome = JSON.parse(cliente.nome);
    clienteNomeDecipher = decrypt(clienteNome);

    clienteEmail = JSON.parse(cliente.email);
    clienteEmailDecipher = decrypt(clienteEmail);

    clienteData_nascimento = JSON.parse(cliente.data_nascimento);
    clienteData_nascimentoDecipher = decrypt(clienteData_nascimento);

    cliente_CPF = JSON.parse(cliente.cpf);
    clienteCPFDecipher = decrypt(cliente_CPF);

    clienteTelefone = JSON.parse(cliente.telefone);
    clienteTelefoneDecipher = decrypt(clienteTelefone);

    clienteTipo_sanguineo = JSON.parse(cliente.tipo_sanguineo);
    clienteTipo_sanguineoDecipher = decrypt(clienteTipo_sanguineo);

    clienteAlergias = JSON.parse(cliente.alergias);
    clienteAlergiasDecipher = decrypt(clienteAlergias);

    return {
      id: cliente.id,
      usuario_id: cliente.usuario_id,
      createdAt: cliente.createdAt,
      updatedAt: cliente.updatedAt,
      nome: clienteNomeDecipher,
      email: clienteEmailDecipher,
      data_nascimento: clienteData_nascimentoDecipher,
      cpf: clienteCPFDecipher,
      telefone: clienteTelefoneDecipher,
      tipo_sanguineo: clienteTipo_sanguineoDecipher,
      alergias: clienteAlergiasDecipher,
    };
  });

  cliente = clientesTodos;
  return cliente;
  //  clienteAlergiasDecipher = decrypt(JSON.parse(cliente.alergias));
  // cliente.alergias = clienteAlergiasDecipher;
};

const encontrarPorId = async function (id) {
  const cliente = await clienteRepository.encontrarPorId(id);

  if (!cliente) {
    return createError(404, 'Cliente não encontrado');
  }
  clienteNome = JSON.parse(cliente.nome);
  clienteEmail = JSON.parse(cliente.email);
  clienteData_nascimento = JSON.parse(cliente.data_nascimento);
  cliente_CPF = JSON.parse(cliente.cpf);
  clienteTelefone = JSON.parse(cliente.telefone);
  clienteTipo_sanguineo = JSON.parse(cliente.tipo_sanguineo);
  clienteAlergias = JSON.parse(cliente.alergias);

  clienteNomeDecipher = decrypt(clienteNome);
  clienteEmailDecipher = decrypt(clienteEmail);
  clienteData_nascimentoDecipher = decrypt(clienteData_nascimento);
  clienteCPFDecipher = decrypt(cliente_CPF);
  clienteTelefoneDecipher = decrypt(clienteTelefone);
  clienteTipo_sanguineoDecipher = decrypt(clienteTipo_sanguineo);
  clienteAlergiasDecipher = decrypt(clienteAlergias);

  cliente.nome = clienteNomeDecipher;
  cliente.email = clienteEmailDecipher;
  cliente.data_nascimento = clienteData_nascimentoDecipher;
  cliente.cpf = clienteCPFDecipher;
  cliente.telefone = clienteTelefoneDecipher;
  cliente.tipo_sanguineo = clienteTipo_sanguineoDecipher;
  cliente.alergias = clienteAlergiasDecipher;

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
