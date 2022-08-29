var express = require('express');
var app = express();
var Objetos = { id: 201721 };

app.get('/', function(req, res) {
  res.status(201).json({ Objetos});

});

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!');
});