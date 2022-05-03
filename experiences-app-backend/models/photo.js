const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    id: {
      type:String,
      required: true
    },
    name: {
      type:String,
      required: true
    }, 
    photoPath: {
      type:String,
      required: true
    },
    photo: {
      data:Buffer,
      contentType:String
    },
    timeCreated: {
      type:Date,
      default:()=>Date.now()
    }
})

module.exports = mongoose.model('Photo', photoSchema)