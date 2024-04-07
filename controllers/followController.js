const Usuario = require('../models/User.js')
const Follow = require('../models/Follow.js')

exports.obtenerFollows = async (req, res) => {
  const userId = req.params.userId

  try {
    const follows = await Follow.find({ follow: userId })
    res.json(follows)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los followers del usuario', error: error.message })
  }
};

exports.follow = async (req, res) => {
  const followee = req.params.userId
  const follower = req.usuario.id

  try {
    
    const existingFollow = await Follow.findOne({ follow: followee, follower: follower })
    if (existingFollow) {
      return res.status(400).json({ mensaje: 'Ya has dado follow a este usuario' })
    }

    const follow = new Follow({
      follow:followee,
      follower:follower
    });

    await follow.save()
    await Usuario.findByIdAndUpdate(followee, { $push: { seguidores: follower } })
    await Usuario.findByIdAndUpdate(follower, { $push: { seguidos: followee } })

    res.status(201).json({ mensaje: 'Follow agregado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar follow al usuario', error: error.message })
  }
};

exports.unFollow = async (req, res) => {
  const followee = req.params.tweetId;
  const follower = req.usuario.id;

  try {

    const existingFollow = await Follow.findOne({ follow: followee, follower: follower })
    if (!existingFollow) {
      return res.status(400).json({ mensaje: 'No sigues a este usuario' })
    }

    await Follow.findOneAndDelete({ follow: followee, follower: follower })
    await Usuario.findByIdAndUpdate(followee, { $pull: { seguidores: follower } })
    await Usuario.findByIdAndUpdate(follower, { $pull: { seguidos: followee } })
    res.json({ mensaje: 'Follow eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar unfollow', error: error.message })
  }
};