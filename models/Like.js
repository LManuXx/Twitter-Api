const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({

    autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario', 
        required: true
      },
      tweet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true
      },
      fecha: {
        type: Date,
        default: Date.now
      }

})

const Like = mongoose.model('Like', likeSchema)

module.exports = Like