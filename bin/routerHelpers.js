var passport = require('passport');
var decode = require('jwt-decode');
// const { sanitizeBody } = require('express-validator/filter');

var _escape = function(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
};

module.exports = {
  isAuthenticated: passport.authenticate('jwt', { session: false }),
  isAdmin: function(auth) {
    var token = auth.substring(auth.indexOf(' ') + 1);
    var decoded = token && decode(token);

    return decoded.admin;
  },
  isAuthorized: function(auth, deviceLocation) {
    var token = auth && auth.substring(auth.indexOf(' ') + 1);
    var decoded = token && decode(token);
    var admin = decoded && decoded.admin;
    var devicePermission = decoded && decoded.permissions.indexOf(deviceLocation) !== -1;

    return (admin || devicePermission);
  },
  sanitize: function(req, res, next) {
    if (req && req.body) {
      Object.keys(req.body).forEach(function(key) {
        if (typeof req.body[key] === 'string') {
          req.body[key] = req.body[key].trim();
          req.body[key] = _escape(req.body[key]);
          // sanitizeBody(key).trim();
          // sanitizeBody(key).escape();
        }
      }.bind(this));
    }
    next();
  }
};
