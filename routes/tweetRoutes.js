const express = require('express')
const router = express.Router()
const Tweet = require('../models/Tweet.js')
const tweetController = require('../controllers/tweetController.js')
const { verificarTokenMw } = require('../middleware/authMiddleware.js')


router.get('/', verificarTokenMw,tweetController.obtenerTodosLosTweets)


router.get('/:id', verificarTokenMw,tweetController.obtenerTweetPorId)


router.post('/', verificarTokenMw,tweetController.crearNuevoTweet)


router.put('/:id', verificarTokenMw,tweetController.actualizarTweet)


router.delete('/:id', verificarTokenMw,tweetController.eliminarTweetPorId)


router.post('/retweet/:id', verificarTokenMw, tweetController.retweetearTweet)


router.delete('/retweet/:id', verificarTokenMw, tweetController.quitarRetweet)

module.exports = router
