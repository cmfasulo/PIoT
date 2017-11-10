var express = require('express');
var router = express.Router();
var routerHelpers = require('../routerHelpers');
var User = require('../db/models/User');

router.get('/', routerHelpers.isAuthenticated, function(req, res, next) {
  User.find(function(err, items, count) {
    if (err) { res.send(err); }
    res.status(200).send(items);
  });
});

router.get('/:id', routerHelpers.isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  });
});

router.post('/', routerHelpers.isAuthenticated, function(req, res, next) {
  var newUser = new User(req.body);

  newUser.save(function(err, item) {
    if (err) { res.send(err); }
    res.status(200).send(item);
  })
});

router.put('/:id', routerHelpers.isAuthenticated, function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) { res.send(err); }

    if (req.body.password) {
      var errors = [];

      if (!req.body.passwordOld || !req.body.passwordConfirm) {
        errors.push({
          field: 'password',
          message: 'Cannot change password without also providing "passwordOld" field and "passwordConfirm" for validation.'
        });
      } else {
        user.comparePassword(req.body.passwordOld, function(err, isMatch) {
          if (!isMatch) {
            errors.push({
              field: 'passwordOld',
              message: 'Old password is invalid.'
            });
          }

          if (req.body.passwordConfirm && req.body.password !== req.body.passwordConfirm) {
            errors.push({
              field: 'passwordConfirm',
              message: 'Fields "password" and "passwordConfirm" do not match.'
            });
          }

          if (errors.length) {
            res.status(400).send({ errors: errors });
          } else {
            var keys = Object.keys(req.body);
            keys.forEach(function(key) {
              if (key !== '_id') {
                user[key] = req.body[key];
              }
            });

            user.save(function(err, updatedUser) {
              if (err) { res.send(err); }
              res.status(200).send(updatedUser);
            });
          }
        });
      }
    } else {
      var keys = Object.keys(req.body);
      keys.forEach(function(key) {
        if (key !== '_id') {
          user[key] = req.body[key];
        }
      });

      user.save(function(err, updatedUser) {
        if (err) { res.send(err); }
        res.status(200).send(updatedUser);
      });
    }
  });
});

router.delete('/:id', routerHelpers.isAuthenticated, function (req, res, next) {
  var admin = routerHelpers.isAdmin(req.headers.authorization);

  if (admin) {
    User.findById(req.params.id, function(err, item) {
      if (err) { res.send(err); }

      User.remove({ _id: item.id }, function (err, result) {
        if (err) { res.send(err); }
        res.status(200).send(item);
      });
    });
  } else {
    res.status(401).send('Unauthorized: Only admins can delete users.');
  }
});

module.exports = router;
