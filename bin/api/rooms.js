var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var Room = require('../db/models/rooms');

var isAuthenticated = passport.authenticate('jwt', { session: false });

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

    Room = req.body;
    Room.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', isAuthenticated, function (req, res, next) {
  Room.remove({ _id: req.params.id }, function (err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

module.exports = router;
