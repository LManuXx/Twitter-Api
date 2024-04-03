const { generarToken } = require('../handlers/jwt.js');
const Usuario = require('../models/User.js');
const bcrypt = require('bcrypt')

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
  const {nombre, correo, contraseña} = req.body

  try {

    const usuarioExistente = Usuario.findOne({correo})

    if(usuarioExistente){
      return res.status(400).json({
        mensaje : 'El correo ya esta en uso'
      })
    }

    const contraseñaHasheada = await bcrypt.hash(contraseña,10)
    const usuario = new Usuario({
      nombre,
      correo,
      contraseña:contraseñaHasheada
    })

    await usuario.save()

    const token = generarToken(usuario._id)

    res.cookie('token', token, {httpOnly:true})
    res.json({mensaje: 'Usuario registrado'})

  } catch(error){
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message })
  }

};

exports.login = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!contraseñaValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }

    const token = generarToken(usuario._id);

    res.cookie('token', token, { httpOnly: true });
    res.json({ mensaje: 'Inicio de sesión exitoso' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error: error.message });
  }
};

exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contraseña } = req.body;
  const usuarioActual = req.usuario; 

  try {
    let usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    
    if (usuarioActual._id !== usuario._id) {
      return res.status(403).json({ mensaje: 'No tienes permiso para actualizar este usuario' });
    }

    
    if (correo && correo !== usuario.correo) {
      const correoExistente = await Usuario.findOne({ correo });
      if (correoExistente) {
        return res.status(400).json({ mensaje: 'El correo ya está en uso' });
      }
    }

    
    usuario.nombre = nombre || usuario.nombre;
    usuario.correo = correo || usuario.correo;

    
    if (contraseña) {
      const contraseñaHasheada = await bcrypt.hash(contraseña, 10);
      usuario.contraseña = contraseñaHasheada;
    }

    await usuario.save();

    res.json({ mensaje: 'Usuario actualizado exitosamente', usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error: error.message });
  }
};

exports.eliminarUsuarioPorId = async (req, res) => {
  
};