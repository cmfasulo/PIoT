var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var User = new Schema({
  firstName : { type: String, required: true },
  lastName : { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  permissions: [{ type: String, ref: 'Room' }],
  admin: { type: Boolean, default: false }
});

User.pre('save', function(next) {
  var user = this;
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

User.methods.comparePassword = function(pw, cb) {
  bcrypt.compare(pw, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
}

User.set('toJSON', {
  transform: function(doc, ret, options) {
    var retJson = {
      _id: ret._id,
      firstName: ret.firstName,
      lastName: ret.lastName,
      username: ret.username,
      permissions: ret.permissions
    };
    return retJson;
  }
});

module.exports = mongoose.model('User', User);;
