var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var axios = require('axios');
var passport = require('passport');
var decode = require('jwt-decode');
var Device = require('../db/models/Device');

var isAuthenticated = passport.authenticate('jwt', { session: false });

var isAuthorized = function(auth) {
  var token = auth.substring(auth.indexOf(' ') + 1);
  var decoded = token && decode(token);

  return decoded.admin;
};

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

router.get('/', function(req, res, next) {
  Device.find().populate('location').exec(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.post('/', function(req, res, next) {
  var newItem = new Device(req.body);

  newItem.save(function(err, item) {
    if (err) { res.send(err); }

    item.populate('location', function(err) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.get('/:id', function(req, res, next) {
  Device.findById(req.params.id).populate('location').exec(function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.put('/:id', function(req, res, next) {
  Device.findById(req.body._id, function(err, item) {
    if (err) { res.send(err); }

    if (req.body.state && req.body.state !== item.state) {
      axios.get('http://' + req.body.localIp + '/' + req.body.state, { timeout: 3000 })
      .then(function (response) {

        var keys = Object.keys(req.body);
        keys.forEach(function(key) {
          item[key] = req.body[key];
        });

        item.state = response.data.state;
        item.lastStateChange = getDateTime();
        item.lastStatusUpdate = getDateTime();
        item.save(function (err, updatedItem) {
          if (err) { res.send(err); }

          updatedItem.populate('location', function(err) {
            if (err) { res.send(err); }
            res.status(200).send(updatedItem);
          });
        });
      })
      .catch(function (error) {
        item.state = 'off';
        item.status = 'offline';
        item.save(function (err, updatedItem) {
          if (err) { res.send(err); }

          updatedItem.populate('location', function(err) {
            if (err) { res.send(err); }
            res.status(200).send(updatedItem);
          });
        });
      });
    } else {
      var keys = Object.keys(req.body);
      keys.forEach(function(key) {
        item[key] = req.body[key];
      });

      item.save(function (err, updatedItem) {
        if (err) { res.send(err); }

        updatedItem.populate('location', function(err) {
          if (err) { res.send(err); }
          res.status(200).send(updatedItem);
        });
      });
    }
  });
});

router.get('/ping/:id', function(req, res, next) {
  Device.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    axios.get('http://' + item.localIp + '/status', { timeout: 3000 })
    .then(function (response) {
      var keys = Object.keys(req.body);
      keys.forEach(function(key) {
        item[key] = req.body[key];
      });

      item.status = 'online';
      item.state = response.data.state;
      item.lastStateChange = getDateTime();
      item.lastStatusUpdate = getDateTime();
      item.save(function (err, updatedItem) {
        if (err) { res.send(err); }

        updatedItem.populate('location', function(err) {
          if (err) { res.send(err); }
          res.status(200).send(updatedItem);
        });
      });
    })
    .catch(function (error) {
      console.log('catch error: ', error);
      item.state = 'off';
      item.status = 'offline';
      item.save(function (err, updatedItem) {
        if (err) { res.send(err); }

        updatedItem.populate('location', function(err) {
          if (err) { res.send(err); }
          res.status(200).send(updatedItem);
        });
      });
    });
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

router.delete('/:id', isAuthenticated, function (req, res, next) {
  var authorized = isAuthorized(req.headers.authorization);

  if (authorized) {
    Device.findById(req.params.id, function(err, item) {
      if (err) { res.send(err); }

      Device.remove({ _id: item.id }, function (err, result) {
        if (err) { res.send(err); }
        res.status(200).send(item);
      });
    });
  } else {
    res.status(401).send('Unauthorized: Only admins can delete devices.');
  }
});

module.exports = router;
