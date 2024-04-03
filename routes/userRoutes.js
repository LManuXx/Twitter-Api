const express = require('express');
const router = express.Router();
const Usuario = require('../models/User.js');
const usuarioController = require('../controllers/usuarioController.js');
const { verificarToken } = require('../handlers/jwt.js');

router.get('/', verificarToken ,usuarioController.obtenerTodosLosUsuarios);

router.get('/:id', verificarToken ,usuarioController.obtenerUsuarioPorId);

router.post('/', usuarioController.crearNuevoUsuario);

router.put('/:id', verificarToken ,usuarioController.actualizarUsuario);

router.delete('/:id', verificarToken ,usuarioController.eliminarUsuarioPorId);


module.exports = router;
