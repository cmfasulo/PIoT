var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require( './db/db' );
var mongoose = require('mongoose');
var cors = require('cors');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var config = require('../config');

// API Endpoints
var Auth = require('./api/auth');
var Users = require('./api/users');
var Devices = require('./api/devices');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  store: new MongoStore({ db: config.db, host: config.host, url: 'mongodb://'+config.dbHost+':'+config.dbPort+'/'+config.dbName }),
  secret: config.secret,
  maxAge: new Date(Date.now() + 900000),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// Configure passport
var User = mongoose.model('User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Router Middleware
app.use('/', Auth);
app.use('/users', Users);
app.use('/devices', Devices);

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
