var express = require('express');
var router = express.Router();
var User = require('../db/models/User');
var jwt = require('jsonwebtoken');
var config = require('../../config');

router.post('/login', function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('Username and Password required.');
  } else {
    User.findOne({ username: req.body.username }, function(err, user) {
      if (err) { return next(err); }

      if (!user) {
        res.status(401).send({ message: 'Username (' + req.body.username + ') not found.' });
      } else {
        user.comparePassword(req.body.password, function(err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign({
              id: user._id,
              username: user.username,
              admin: user.admin,
              permissions: user.permissions,
              },
              config.secret,
              { expiresIn: 60 * 15 }
            );
            res.status(200).send({ message: 'Login Successful.', token: token});
          } else {
            res.status(400).send({ message: 'Invalid Username/Password.' });
          }
        });
      }
    });
  }
});

router.post('/authenticate', function(req, res, next) {
  var isAuthenticated = passport.authenticate('jwt', { session: false });

  if (!isAuthenticated) {
    res.status(200).send({ message: 'Token Valid.'});
  } else {
    res.status(400).send({ message: 'Token Invalid.'});
  }
});

module.exports = router;
