var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room = new Schema({
  _id: { type: String, required: true },
  name : { type: String, required: true }
});

module.exports = mongoose.model('Room', Room);;
