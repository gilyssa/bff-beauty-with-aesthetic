require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const handle404Error = require('./src/middlewares/handle404Error');
const app = express();

const usuarioRoute = require('./src/routes/usuario.route');
const handleError = require('./src/middlewares/handleError');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/usuarios', usuarioRoute);

app.use(handle404Error);  
app.use(handleError);
app.listen(process.env.PORTA, () => { console.log('Api escutando na porta   3000!') })


  