const express = require('express');
const mongoose = require('mongoose');

const app = express();

const PORT = 3000;

require('./db')();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('¡Hola, mundo desde Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
