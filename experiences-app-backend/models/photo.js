const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    photoPath: {
      type:String,
      required: true
    },
    timeCreated: {
      type:Date,
      default:()=>Date.now()
    }
})

module.exports = mongoose.model('Photo', photoSchema)