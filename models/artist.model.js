const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;



const artistSchema = new mongoose.Schema(
  {
    nom:String,
    birth:Date,
    followers:Number,
    albums:[{
    	type:Schema.Types.ObjectID,
    	ref:'album' 
    }]
    
  }
);



module.exports = mongoose.model('artist', artistSchema);