var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Device = mongoose.model('Device');

router.get('/', function(req, res, next) {
  Device.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.post('/', function(req, res, next) {
  var newItem = new Device(req.body);

  newItem.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(201).send(item);
  });
});

router.get('/:id', function(req, res, next) {
  Device.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.put('/:id', function(req, res, next) {
  Device.findOneAndUpdate({ _id: req.body._id }, req.body, {new: true}, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.delete('/:id', function (req, res, next) {
  Device.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    device = item;
    Device.remove({ _id: device.id }, function (err, item) {
      if (err) { res.send(err); }
      res.status(200).send(device);
    });
  });
});

module.exports = router;
