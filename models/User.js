const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    correo: {
      type: String,
      required: true,
      unique: true
    },
    contraseña: {
      type: String,
      required: true
    },
    tweets: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet' 
    }],
    favoritos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet' 
    }],
    fechaRegistro: {
      type: Date,
      default: Date.now
    },
    seguidores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
      }],
      seguidos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario' 
      }],
      retweets: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet'
      }]
  });


const Usuario = mongoose.model('User', usuarioSchema);

module.exports = Usuario;
