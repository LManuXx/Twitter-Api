const express = require('express');
const router = express.Router();
const Comentario = require('../models/Comentario.js');

// Obtener todos los comentarios de un tweet
router.get('/:tweetId', comentarioController.obtenerComentariosPorTweet);

// Obtener un comentario por su ID
router.get('/:id', comentarioController.obtenerComentarioPorId);

// Crear un nuevo comentario para un tweet
router.post('/', comentarioController.crearNuevoComentario);

// Actualizar un comentario existente
router.put('/:id', comentarioController.actualizarComentario);

// Eliminar un comentario por su ID
router.delete('/:id', comentarioController.eliminarComentarioPorId);


module.exports = router;
