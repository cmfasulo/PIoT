var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var axios = require('axios');

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

    if (req.body.state !== item.state) {
      axios.get('http://' + req.body.localIp + '/' + req.body.state)
      .then(function (response) {

        var keys = Object.keys(req.body);
        keys.forEach(function(key) {
          item[key] = req.body[key];
        });

        if (response.data.state === req.body.state) {
          item.lastStateChange = getDateTime();
          item.lastStatusUpdate = getDateTime();
          item.save(function (err, updatedItem) {
            if (err) { res.send(err); }
            res.status(200).send(updatedItem);
          });
        } else {
          res.send('Error: Device was not updated or is unresponsive.');
        }
      })
      .catch(function (error) {
        res.send(err);
      });
    } else {
      var keys = Object.keys(req.body);
      keys.forEach(function(key) {
        item[key] = req.body[key];
      });

      item.save(function (err, updatedItem) {
        if (err) { res.send(err); }
        res.status(200).send(updatedItem);
      });
    }
  });
});

router.post('/checkin', function(req, res, next) {
  Device.findById(req.body.localIp, function(err, item) {
    if (err) { res.send(err); }

    item.state = req.body.state;
    item.status = 'online';
    item.lastStatusUpdate = getDateTime();

    item.save(function (err, updatedItem) {
      if (err) {
        console.log('Device (' + item._id + '-' + item.name + ') CheckIn failed. Error:')
        console.log(err);
      }
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
