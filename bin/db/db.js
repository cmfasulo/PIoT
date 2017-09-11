var mongoose = require('mongoose');
var User = require('./models/User');
var Device = require('./models/Device');

mongoose.model('User', User);
mongoose.model('Device', Device);

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/PIoT', { useMongoClient: true });
