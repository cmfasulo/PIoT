var mongoose = require('mongoose');
var config = require('../config');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://' + config.dbHost + ':' + config.dbPort + '/' + config.dbName, { useMongoClient: true });
