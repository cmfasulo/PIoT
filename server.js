var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require( './db/db');
var cors = require('cors');
var passport = require('passport');
var User = require('./db/models/User');
var passportJWT = require('passport-jwt');
var routerHelpers = require('./routerHelpers');
var config = require('./config');

// API Endpoints
var login = require('./api/login');
var users = require('./api/users');
var devices = require('./api/devices');
var rooms = require('./api/rooms');

var app = express();

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
};

passport.use(new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  User.findById(jwt_payload.id, function(err, user) {
    if (!user) { next(null, false); }
    next(null, user);
  });
}));

app.use(passport.initialize());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:3000', 'http://127.0.0.1:3000'] }));

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Router Middleware
app.use(routerHelpers.sanitize);
app.use('/', login);
app.use('/users', users);
app.use('/devices', devices);
app.use('/rooms', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).send();
});

module.exports = app;
