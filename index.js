require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const handle404Error = require('./src/app/middlewares/handle404Error');
const app = express();

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

const usuarioRoute = require('./src/app/routes/usuario.route');
const procedimentoRoute = require('./src/app/routes/procedimento.route');
const clienteRoute = require('./src/app/routes/cliente.route');
const indexRoute = require('./src/app/routes/index.route');
const handleError = require('./src/app/middlewares/handleError');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', indexRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/procedimentos', procedimentoRoute);
app.use('/api/clientes', clienteRoute);

app.use(handle404Error);
app.use(handleError);

app.listen(process.env.PORT || process.env.PORTA, () => {
  console.log('Api escutando na porta 3001!');
});
