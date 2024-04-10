const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    required: true
  },
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  retuiteadoPor: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  }]
});

const Comentario = mongoose.model('Comentario', comentarioSchema);

module.exports = Comentario;
