const express = require('express')
const likeController = require('../controllers/likesController.js')
const {verificarTokenMw} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.get('/:tweetId',verificarTokenMw,likeController.obtenerLikesDePublicacion)

router.post('/:tweetId',verificarTokenMw, likeController.darLikeAPublicacion)

router.post('/unlike/:tweetId',verificarTokenMw,likeController.quitarLikeAPublicacion)

router.post('/:tweetId/users',verificarTokenMw,likeController.obtenerUsuariosQueHanDadoLike)

module.exports = router



