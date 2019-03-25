const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    title:String,
    content:String,
    date:String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('note', noteSchema);