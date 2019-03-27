const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var album = require('../models/album.model.js');
var artist = require('../models/artist.model.js');



const trackSchema = new mongoose.Schema(
  {
    album_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'album'
    },
    title:String,
    duration:Number,
    listenings:Number,
    likes:Number,
    featuring:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist' 
    }
    
  }
);

module.exports = mongoose.model('track', trackSchema);