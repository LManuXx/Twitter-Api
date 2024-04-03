// usuarioController.js

const Usuario = require('../models/User.js');

exports.obtenerTodosLosUsuarios = async (req, res) => {
  try{
    const usuarios = await Usuario.find()
    res.json(usuarios)
  }catch(error){
    res.status(500).json({
        mensaje: 'Error al obtener usuarios',
        error: error.message
    })
  }
};

exports.obtenerUsuarioPorId = async (req, res) => {
  try{
    const id = req.params.id
    const usuario = Usuario.findById(id)
    if(!usuario){
        return res.status(404).json({
            mensaje:'Usuario no encontrado'
        })
    }
    res.json(usuario)

  }catch(error){
    res.status(500).json({
        mensaje: 'Error al obtener el usuario',
        error: error.message
    })
  }
};

exports.crearNuevoUsuario = async (req, res) => {
  
};

exports.actualizarUsuario = async (req, res) => {
  
};

exports.eliminarUsuarioPorId = async (req, res) => {
  
};