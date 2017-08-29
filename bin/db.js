var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var User = new Schema({
    firstName : String,
    lastName : String,
    email: String,
    password: String
});

var Device = new Schema({
    name : String,
    type: String,
    localIp: String,
    location: String,
    status: Boolean,
    state: String,
    lastStatusUpdate: String,
    lastStateChange: String
});

mongoose.model('User', User);
mongoose.model('Device', Device);

mongoose.connect('mongodb://localhost/PIoT');
