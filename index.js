require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const handle404Error = require('./src/middlewares/handle404Error');
const app = express();

const cors = require('cors');
var corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));

const usuarioRoute = require('./src/routes/usuario.route');
const procedimentoRoute = require('./src/routes/procedimento.route');
const indexRoute = require('./src/routes/index.route');
const handleError = require('./src/middlewares/handleError');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', indexRoute);
app.use('/api/usuarios', usuarioRoute);
app.use('/api/procedimentos', procedimentoRoute);
app.use(handle404Error);
app.use(handleError);

app.listen(process.env.PORT || process.env.PORTA, () => {
  console.log('Api escutando na porta 3001!');
});
