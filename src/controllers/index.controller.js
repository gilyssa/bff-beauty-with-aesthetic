const jsonResponse = async function (req, res, next) {
  try {
    const response = {
      apresentação: 'Seja bem-vindo a API do TCC Beauty With Aesthetic',
      objetivo:
        'Nosso objetivo é facilitar a conexão de profissionais da área da estética com os dados de seus clientes',
      aplicação:
        'Somos uma aplicação web focada para mobile onde os clientes poderão fazer seu cadastro e adicionar seus clientes!',
    };
    res.send(response);
  } catch (error) {
    next(error);
  }
};

module.exports = { jsonResponse: jsonResponse };
