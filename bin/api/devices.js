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
  Device.findById(req.body._id, function(err, item) {
    if (err) { res.send(err); }

    var keys = Object.keys(req.body);
    keys.forEach(function(key) {
      item[key] = req.body[key];
    });

    if (req.body.state !== item.state) {
      item.lastStateChange = getDateTime();
    } else if (req.ip === item.localIp) {
      item.status = 'online';
      item.lastStatusUpdate = getDateTime();
    }

    item.save(function (err, updatedItem) {
      if (err) { res.send(err); }
      res.status(200).send(updatedItem);
    });
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

var getDateTime = function() {
  var currentdate = new Date();
  var datetime = (currentdate.getMonth()+1) + "/"
    + currentdate.getDate() + "/"
    + currentdate.getFullYear() + "-"
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
  return datetime;
}

module.exports = router;
