const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  coordinates: {
    type:Double,
    required:true
  },
  description: {
    type:String
  }
})

module.exports = mongoose.model('Post', postSchema)