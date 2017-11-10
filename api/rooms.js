var express = require('express');
var router = express.Router();
var routerHelpers = require('../routerHelpers');
var Room = require('../db/models/Room');

router.get('/', routerHelpers.isAuthenticated, function(req, res, next) {
  Room.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.get('/:id', routerHelpers.isAuthenticated, function(req, res, next) {
  Room.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.post('/', routerHelpers.isAuthenticated, function(req, res, next) {
  var newRoom = new Room(req.body);

  newRoom.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  })
});

router.put('/:id', routerHelpers.isAuthenticated, function(req, res, next) {
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

router.delete('/:id', routerHelpers.isAuthenticated, function (req, res, next) {
  var admin = routerHelpers.isAdmin(req.headers.authorization);

  if (admin) {
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
