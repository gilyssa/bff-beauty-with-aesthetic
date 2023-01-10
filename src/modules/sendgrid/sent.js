// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const sgMail = require('@sendgrid/mail');
require('dotenv').config('../../../.env');
sgMail.setApiKey(
  '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',
);

async function sendEmail(usuario, random) {
  const msg = {
    to: usuario.email, // Change to your recipient
    from: 'beauty.with.aesthetic@gmail.com', // Change to your verified sender
    subject: 'Recuperação de Senha',
    text: 'Recuperação',
    html:
      '<h1 style="text-align: center;"><span style="color: #34495e;"><strong>Recupera&ccedil;&atilde;o de Senha&nbsp;</strong></span></h1><p style="text-align: center;"><span style="color: #34495e;"><strong><img src="https://i.ibb.co/2g2bmzx/Design-sem-nome-1-removebg-preview-2.png" alt="icone" width="199" height="199" /></strong></span></p><p style="text-align: center;"><span style="color: #34495e;"><strong>Voc&ecirc; solicitou uma recupera&ccedil;&atilde;o em nosso site! Copie o c&oacute;digo e cole na caixa de confirma&ccedil;&atilde;o para alterar a sua senha:</strong></span></p><h1 style="text-align: center;"><span style="color: #ffffff; background-color: #34495e;"><strong>' +
      random +
      '</strong></span></h1>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
  sendEmail: sendEmail,
};
