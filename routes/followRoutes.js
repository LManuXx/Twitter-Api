const express = require('express')
const followController = require('../controllers/followController.js')
const {verificarTokenMw} = require('../middleware/authMiddleware.js')

const router = express.Router()

router.get('/:userId',verificarTokenMw,followController.obtenerFollows)

router.post('/:userId',verificarTokenMw, followController.follow)

router.post('/unfollow/:tweetId',verificarTokenMw, followController.unFollow)

module.exports = router



