const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var album = require('../models/artist.model.js');




const trackSchema = new mongoose.Schema(
  {
    title:String,
    duration:Number,
    listenings:Number,
    likes:Number,
    featuring:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artistSchema' 
    }
    
  }
);

module.exports = mongoose.model('track', trackSchema);