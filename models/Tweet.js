// tweet.js

const mongoose = require('mongoose');

// Definir el esquema del tweet
const tweetSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  favoritoDe: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario' 
  }],
  comentarios: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comentario' 
  }],
  fechaPublicacion: {
    type: Date,
    default: Date.now
  },
  retweetDe: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet'
  }
});


const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
