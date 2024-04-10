const Tweet = require('../models/Tweet.js')
const Usuario = require('../models/User.js')

exports.obtenerTodosLosTweets = async (req, res) => {
  
  try{
    const tweet = await Tweet.find()
    if(!tweet){
      return res.status(404).json({
        mensaje:'Tweets no encontrado'
    })
    }

    res.json(tweet)


  }catch(error){
    res.status(500).json({ mensaje: 'Error al encontrar los tweets', error: error.message})
  }

};

exports.obtenerTweetPorId = async (req, res) => {
  try{
    const tweetId = req.params.id
    const tweet = await Tweet.findById(tweetId)
    if(!tweet){
      return res.status(404).json({
        mensaje:'Tweet no encontrado'
    })
    }

    res.json(tweet)


  }catch(error){
    res.status(500).json({ mensaje: 'Error al encontrar el tweet', error: error.message})
  }


};

exports.crearNuevoTweet = async (req, res) => {
  const contenido = req.body.contenido
  const usuarioId = req.usuario.id
  

  try{

    const nuevoTweet = new Tweet (
      {
        contenido,
        autor: usuarioId
      }
    )

    await nuevoTweet.save()
    await Usuario.findByIdAndUpdate(usuarioId, { $push: { tweets: nuevoTweet } })


    res.status(200).json({
      mensaje: 'Tweet creado correctamente', tweet: nuevoTweet
    })

  }catch(error){

    res.status(500).json({ mensaje: 'Error al crear el tweet', error: error.message})

  }

};




exports.actualizarTweet = async (req, res) => {
  const tweetId = req.params.id
  const { contenido } = req.body
  const usuarioId = req.usuario.id

  try {
    
    const tweet = await Tweet.findOne({ _id: tweetId, autor: usuarioId })
    if (!tweet) {
      return res.status(404).json({ mensaje: 'Tweet no encontrado o no tienes permisos para editarlo' })
    }

    tweet.contenido = contenido
    await tweet.save()

    res.json({ mensaje: 'Tweet actualizado correctamente', tweet })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el tweet', error: error.message })
  }
};


exports.eliminarTweetPorId = async (req, res) => {
  const tweetId = req.params.id
  const usuarioId = req.usuario.id

  try {
    
    const tweet = await Tweet.findOne({ _id: tweetId, autor: usuarioId })
    console.log(tweet)
    if (!tweet) {
      return res.status(404).json({ mensaje: 'Tweet no encontrado o no tienes permisos para editarlo' })
    }

    await Tweet.deleteOne({_id:tweet._id})
    await Usuario.findByIdAndUpdate(usuarioId, { $pull: { tweets: tweetId } })

    res.json({ mensaje: 'Tweet borrado correctamente'})

  } catch (error) {
    res.status(500).json({ mensaje: 'Error al borrar el tweet', error: error.message })
  }

}


exports.retweetearTweet = async (req, res) => {
  const tweetId = req.params.id
  const usuarioId = req.usuario.id

  try {
    
    const usuario = await Usuario.findById(usuarioId)
    if (usuario.retweets.includes(tweetId)) {
      return res.status(400).json({ mensaje: 'Ya has retuiteado este tweet' })
    }
    
    await Usuario.findByIdAndUpdate(usuarioId,{ $push: { retweets: tweetId } })

    await Tweet.findByIdAndUpdate(tweetId,{ $push: { retuiteadoPor: usuarioId} })

    res.status(201).json({ mensaje: 'Tweet retuiteado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al retuitear el tweet', error: error.message })
  }
}


exports.quitarRetweet = async (req, res) => {
  const tweetId = req.params.id
  const usuarioId = req.usuario.id

  try {
    
    const usuario = await Usuario.findById(usuarioId)
    if (!usuario.retweets.includes(tweetId)) {
      return res.status(400).json({ mensaje: 'Todavía no has retuiteado este tweet' })
    }

    await Usuario.findByIdAndUpdate(usuarioId, { $pull: { retweets: tweetId } })

    await Tweet.findByIdAndUpdate(tweetId, { $pull: { retuiteadoPor: usuarioId } })

    res.status(200).json({ mensaje: 'Retweet eliminado correctamente' })
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al quitar el retweet del tweet', error: error.message })
  }
};
