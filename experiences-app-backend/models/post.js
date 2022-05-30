const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type:String,
    default:"Untitled"
  },
  body: {
    type:String
  },
  coordinates: {
    type:Array,
    required:true
  },
  photo: [{type: mongoose.Schema.Types.ObjectId, ref: 'Photo'}]
})

module.exports = mongoose.model('Post', postSchema)