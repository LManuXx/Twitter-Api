const express = require('express');
const usuarioController = require('../controllers/usuarioController.js');
const { verificarTokenMw } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.get('/', verificarTokenMw ,usuarioController.obtenerTodosLosUsuarios);

router.get('/:id', verificarTokenMw ,usuarioController.obtenerUsuarioPorId);

router.post('/', usuarioController.crearNuevoUsuario);

router.put('/:id', verificarTokenMw ,usuarioController.actualizarUsuario);

router.delete('/:id', verificarTokenMw ,usuarioController.eliminarUsuarioPorId);

router.post('/login', usuarioController.login);

router.post('/logout', verificarTokenMw, usuarioController.logout);



module.exports = router;
