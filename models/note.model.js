const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title:String,
    content:String
    
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('note', noteSchema);