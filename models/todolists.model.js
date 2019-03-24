const mongoose = require('mongoose');
var ObjectID = require('mongodb').ObjectID;



const todolistsSchema = new mongoose.Schema(
  {
    title:String,
    list:[{
    	//todoId:ObjectID,
    	todo:String,
    	checked:Number 
    }]
    
  }
);



module.exports = mongoose.model('todolists', todolistsSchema);
