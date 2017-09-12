var mongoose = require('mongoose');
var User = require('./models/User');
var Device = require('./models/Device');
var config = require('../../config');

mongoose.model('User', User);
mongoose.model('Device', Device);

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + config.dbHost + ':' + config.dbPort + '/' + config.dbName, { useMongoClient: true });
