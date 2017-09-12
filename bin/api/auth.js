var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.post('register', function(req, res) {
  var newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username
  };

  User.register(new User(newUser), req.body.password, function(err, user) {
    if (err) { res.send(err); }

    passport.authenticate('local')(req, res, function() {
      req.session.save(function(err) {
        if (err) { return next(err); }
        res.status(200).send('Registration Successful!');
      });
    });
  });
});

router.post('login', passport.authenticate('local'), function(req, res) {
  res.status(200).send('Login Successful!');
});

router.get('logout', function(req, res) {
  req.logout();
});

module.exports = router;
