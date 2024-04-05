const Comentario = require('../models/Comentario.js')
const Tweet = require('../models/Tweet.js')

exports.obtenerComentariosPorTweet = async (req, res) => {
  try {
    const tweetId = req.params.tweetId
    const comentarios = await Comentario.find({ tweet: tweetId })
    res.json(comentarios)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los comentarios del tweet', error: error.message })
  }
}

exports.obtenerComentarioPorId = async (req, res) => {
  try {
    const comentarioId = req.params.comentarioId
    const comentario = await Comentario.findById(comentarioId)
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' })
    }
    res.json(comentario)
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el comentario', error: error.message })
  }
}

exports.crearNuevoComentario = async (req, res) => {
  const { contenido } = req.body
  const usuarioId = req.usuario.id
  const tweetId = req.params.tweetId

  try {
    
    const nuevoComentario = new Comentario({
      contenido,
      autor: usuarioId,
      tweet: tweetId
    });
    await nuevoComentario.save()

    
    await Tweet.findByIdAndUpdate(tweetId, { $push: { comentarios: nuevoComentario._id } })

    res.status(201).json({ mensaje: 'Comentario creado correctamente', comentario: nuevoComentario })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el comentario', error: error.message })
  }
};

exports.actualizarComentario = async (req, res) => {
  const comentarioId = req.params.comentarioId
  const { contenido } = req.body
  const usuarioId = req.usuario.id

  try {

    const comentario = await Comentario.findById(comentarioId)
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' })
    }
    if (comentario.autor.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: 'No tienes permiso para actualizar este comentario' })
    }
    comentario.contenido = contenido
    await comentario.save()
    res.json({ mensaje: 'Comentario actualizado correctamente', comentario })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el comentario', error: error.message })
  }
}


exports.eliminarComentarioPorId = async (req, res) => {
  const comentarioId = req.params.comentarioId
  const usuarioId = req.usuario.id

  try {
    const comentario = await Comentario.findById(comentarioId);
    if (!comentario) {
      return res.status(404).json({ mensaje: 'Comentario no encontrado' })
    }
    if (comentario.autor.toString() !== usuarioId) {
      return res.status(403).json({ mensaje: 'No tienes permiso para eliminar este comentario' })
    }
    await Comentario.deleteOne({_id:comentario._id})
    res.json({ mensaje: 'Comentario eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el comentario', error: error.message })
  }
}
