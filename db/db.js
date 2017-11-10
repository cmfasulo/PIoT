var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var config = require('../config');

var dbPath = 'mongodb://' + config.db.address + ':' + config.db.port + '/' + config.db.name;
mongoose.connect(dbPath, { useMongoClient: true });

if (process.env.DB_DEFAULT && process.env.DB_DEFAULT === 'true') {
  var User = require('./models/User');
  var Device = require('./models/Device');
  var Room = require('./models/Room');

  var populate = function(Model, items) {
    Model.remove({}, function(err) {
      if (err) {
        console.log(err);
      } else {
        config.db.default[items].forEach(function(item) {
          var newItem = new Model(item);

          newItem.save(function(err, item) {
            if (err) {
              console.log(err);
            }
          })
        });
      }
    })
  };

  populate(User, 'users');
  populate(Device, 'devices');
  populate(Room, 'rooms');
}
