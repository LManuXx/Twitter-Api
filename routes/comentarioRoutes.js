const express = require('express');
const router = express.Router();
const comentarioController = require('../controllers/comentarioController.js');
const { verificarTokenMw } = require('../middleware/authMiddleware.js');

// Obtener todos los comentarios de un tweet
router.get('/:tweetId', verificarTokenMw,comentarioController.obtenerComentariosPorTweet);

// Obtener un comentario por su ID
router.get('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.obtenerComentarioPorId);

// Crear un nuevo comentario para un tweet
router.post('/:tweetId', verificarTokenMw,comentarioController.crearNuevoComentario);

// Actualizar un comentario existente
router.put('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.actualizarComentario);

// Eliminar un comentario por su ID
router.delete('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.eliminarComentarioPorId);

module.exports = router;
