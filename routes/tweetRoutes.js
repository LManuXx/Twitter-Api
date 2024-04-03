const express = require('express');
const router = express.Router();
const Tweet = require('../models/Tweet.js');
const tweetController = require('./tweetController');

// Obtener todos los tweets
router.get('/', tweetController.obtenerTodosLosTweets);

// Obtener un tweet por su ID
router.get('/:id', tweetController.obtenerTweetPorId);

// Crear un nuevo tweet
router.post('/', tweetController.crearNuevoTweet);

// Actualizar un tweet existente
router.put('/:id', tweetController.actualizarTweet);

// Eliminar un tweet por su ID
router.delete('/:id', tweetController.eliminarTweetPorId);

module.exports = router;
