var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');

var isAuthenticated = function (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
  }
	res.send('Permission Denied.');
}

router.get('/', isAuthenticated, function(req, res, next) {
  User.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.put('/:id', isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }

    User = req.body;
    User.save(function(err, item) {
      if (err) { res.send(err); }
      res.status(200).send(item);
    });
  });
});

router.delete('/:id', isAuthenticated, function (req, res, next) {
  User.remove({ _id: req.params.id }, function (err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

module.exports = router;
