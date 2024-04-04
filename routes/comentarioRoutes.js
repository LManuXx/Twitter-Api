const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario.js');
const comentarioController = require('../controllers/comentarioController.js');
const { verificarTokenMw } = require('../middleware/authMiddleware.js');

router.get('/:tweetId', verificarTokenMw,comentarioController.obtenerComentariosPorTweet);

router.get('/:id', verificarTokenMw,comentarioController.obtenerComentarioPorId);

router.post('/', verificarTokenMw,comentarioController.crearNuevoComentario);

router.put('/:id', verificarTokenMw,comentarioController.actualizarComentario);

router.delete('/:id', verificarTokenMw,comentarioController.eliminarComentarioPorId);


module.exports = router;
