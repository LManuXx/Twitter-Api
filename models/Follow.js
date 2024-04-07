const mongoose = require('mongoose');

const followSchema = new mongoose.Schema({
  follow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  fechaFollow: {
    type: Date,
    default: Date.now
  }
});

const Follow = mongoose.model('Follow', followSchema);

module.exports = Follow;
