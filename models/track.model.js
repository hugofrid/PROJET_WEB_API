const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;



const trackSchema = new mongoose.Schema(
  {
    title:String,
    duration:Number,
    listenings:Number,
    likes:Number,
    featuring:[{
    	type:mongoose.Schema.Types.ObjectID,
    	ref:'artist' 
    }]
    
  }
);



module.exports = mongoose.model('track', trackSchema);