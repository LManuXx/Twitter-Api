const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes.js');
const tweetRoutes = require('./routes/tweetRoutes.js');
const comentarioRoutes = require('./routes/comentarioRoutes.js');
const {PORT} = require('../config')

const app = express();

require('./db')();

app.use(express.json());

app.use(cors()); 

app.use('/usuarios', userRoutes);
app.use('/tweets', tweetRoutes);
app.use('/tweets/:tweetId/comentarios', comentarioRoutes);


app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
