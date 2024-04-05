const Like = require('../models/Like.js')
const Tweet = require('../models/Tweet.js')
const Usuario = require('../models/User.js')

exports.obtenerLikesDePublicacion = async (req, res) => {
  const tweetId = req.params.tweetId

  try {
    const likes = await Like.find({ tweet: tweetId })
    res.json(likes)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los likes de la publicación', error: error.message })
  }
};

exports.darLikeAPublicacion = async (req, res) => {
  const tweetId = req.params.tweetId
  const usuarioId = req.usuario.id

  try {
    
    const existingLike = await Like.findOne({ tweet: tweetId, usuario: usuarioId })
    if (existingLike) {
      return res.status(400).json({ mensaje: 'Ya has dado like a esta publicación' })
    }


    const nuevoLike = new Like({
      usuario: usuarioId,
      tweet: tweetId
    });

    await nuevoLike.save()
    await Tweet.findByIdAndUpdate(tweetId, { $push: { favoritoDe: nuevoLike.usuario } })

    res.status(201).json({ mensaje: 'Like agregado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar like a la publicación', error: error.message })
  }
};

exports.quitarLikeAPublicacion = async (req, res) => {
  const tweetId = req.params.tweetId;
  const usuarioId = req.usuario.id;

  try {
    await Like.findOneAndDelete({ tweet: tweetId, usuario: usuarioId })
    await Tweet.findByIdAndUpdate(tweetId, { $pull: { favoritoDe: usuarioId } })
    res.json({ mensaje: 'Like eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al quitar like de la publicación', error: error.message })
  }
};

exports.obtenerUsuariosQueHanDadoLike = async (req, res) => {
  const tweetId = req.params.tweetId

  try {
    const likes = await Like.find({ tweet: tweetId })
    const usuariosQueHanDadoLike = await Usuario.find({ _id: { $in: likes.map(like => like.usuario) } })
    res.json(usuariosQueHanDadoLike)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los usuarios que han dado like a la publicación', error: error.message })
  }
};
