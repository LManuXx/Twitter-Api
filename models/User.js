// usuario.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Definir el esquema del usuario
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
  edad: {
    type: Number,
    required: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});


usuarioSchema.pre('save', async function(next) {
  try {
    
    if (!this.isModified('contraseña')) {
      return next();
    }

    
    const hash = await bcrypt.hash(this.contraseña, 10);

    
    this.contraseña = hash;
    next();
  } catch (error) {
    next(error);
  }
});


usuarioSchema.methods.compararContraseña = async function(contraseña) {
  try {

    return await bcrypt.compare(contraseña, this.contraseña);
  } catch (error) {
    throw new Error(error);
  }
};


const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;