const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;



const albumSchema = new mongoose.Schema(
  {
    title:String,
    release:Date,
    genre:String,
    cover_url:String,
    tracks:[{
    	type:mongoose.Schema.Types.ObjectID,
    	ref:'track' 
    }]
    
  }
);



module.exports = mongoose.model('album', albumSchema);