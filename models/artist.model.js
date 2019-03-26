const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var album = require('../models/album.model.js');




const artistSchema = new mongoose.Schema(
  {
    nom:String,
    birth:String,
    followers:Number,
    albums:[{
    	type:mongoose.Schema.Types.ObjectId,
        ref:'album' 
    }]
  }
);



module.exports = mongoose.model('artist', artistSchema);