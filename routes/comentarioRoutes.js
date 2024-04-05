const express = require('express')
const router = express.Router()
const comentarioController = require('../controllers/comentarioController.js')
const { verificarTokenMw } = require('../middleware/authMiddleware.js')

router.get('/:tweetId', verificarTokenMw,comentarioController.obtenerComentariosPorTweet)

router.get('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.obtenerComentarioPorId)

router.post('/:tweetId', verificarTokenMw,comentarioController.crearNuevoComentario)

router.put('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.actualizarComentario)

router.delete('/:tweetId/:comentarioId', verificarTokenMw,comentarioController.eliminarComentarioPorId)

module.exports = router;
