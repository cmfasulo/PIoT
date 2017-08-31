var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

router.get('/', function(req, res, next) {
  User.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.post('/', function(req, res, next) {
  var newItem = new User(req.body);

  newItem.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(201).send(item);
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.put('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    User = req.body;
    User.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', function (req, res, next) {
  User.remove({ _id: req.params.id }, function (err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

module.exports = router;
