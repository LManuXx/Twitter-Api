const express = require('express');
const router = express.Router();
const Usuario = require('../models/User.js');

const usuarioController = require('./usuarioController');

// Obtener todos los usuarios
router.get('/', usuarioController.obtenerTodosLosUsuarios);

// Obtener un usuario por su ID
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Crear un nuevo usuario
router.post('/', usuarioController.crearNuevoUsuario);

// Actualizar un usuario existente
router.put('/:id', usuarioController.actualizarUsuario);

// Eliminar un usuario por su ID
router.delete('/:id', usuarioController.eliminarUsuarioPorId);


module.exports = router;
