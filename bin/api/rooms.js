var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var decode = require('jwt-decode');
var Room = require('../db/models/Room');

var isAuthenticated = passport.authenticate('jwt', { session: false });

var isAuthorized = function(auth) {
  var token = auth.substring(auth.indexOf(' ') + 1);
  var decoded = token && decode(token);

  return decoded.admin;
};

router.get('/', isAuthenticated, function(req, res, next) {
  Room.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.get('/:id', isAuthenticated, function(req, res, next) {
  Room.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.post('/', isAuthenticated, function(req, res, next) {
  var newRoom = new Room(req.body);

  newRoom.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  })
});

router.put('/:id', isAuthenticated, function(req, res, next) {
  Room.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    var keys = Object.keys(req.body);
    keys.forEach(function(key) {
      item[key] = req.body[key];
    });

    item.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', isAuthenticated, function (req, res, next) {
  var authorized = isAuthorized(req.headers.authorization);

  if (authorized) {
    Room.findById(req.params.id, function(err, item) {
      if (err) { res.send(err); }

      Room.remove({ _id: item.id }, function (err, result) {
        if (err) { res.send(err); }
        res.status(200).send(item);
      });
    });
  } else {
    res.status(401).send('Unauthorized: Only admins can delete rooms.');
  }
});

module.exports = router;
