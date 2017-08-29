var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Model = mongoose.model('Device');

router.get('/', function(req, res, next) {
  Model.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.post('/', function(req, res, next) {
  var newItem = new Model(req.body);

  newItem.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(201).send(item);
  });
});

router.get('/:id', function(req, res, next) {
  Model.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.put('/:id', function(req, res, next) {
  Model.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    device = req.body;
    device.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', function (req, res, next) {
  Model.remove({ _id: req.params.id }, function (err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

module.exports = router;
