var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Device = new Schema({
  name : { type: String, required: true, unique: true },
  type: { type: String, required: true },
  localIp: { type: String, required: true, unique: true },
  location: { type: String, ref: 'Room', required: true },
  status: { type: String, default: 'offline' },
  state: { type: String, default: 'off' },
  lastStatusUpdate: { type: String, default: null },
  lastStateChange: { type: String, default: null }
});

module.exports = mongoose.model('Device', Device);
