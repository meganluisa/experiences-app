const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type:String,
    default:"Untitled"
  },
  coordinates: {
    type:Double,
    required:true
  },
  description: {
    type:String
  }
})

module.exports = mongoose.model('Post', postSchema)