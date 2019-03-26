const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var artist = require('../models/artist.model.js');

var track = require('../models/track.model.js');



const albumSchema = new mongoose.Schema(
  {
    title:String,
    release:String,
    genre:String,
    artist_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'artist' 
    },
    cover_url:String, 
    tracks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'track' 
    }]   
  }
);

module.exports = mongoose.model('album', albumSchema);