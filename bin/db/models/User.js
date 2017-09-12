var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String },
  permissions: { type: [], default: ['living-room', 'kitchen', 'foyer', 'garage', 'main-bathroom'] }
});

User.plugin(passportLocalMongoose);

module.exports = User;
