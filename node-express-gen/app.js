var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport  = require('passport');
var mongoUtil = require('./public/js/mongoUtil');
var port        = process.env.PORT || 3000; // means: whatever is in the environment variable PORT, or 3000 if there's nothing there. Port might be automatically configured by another service. If set fix, this might cause a 500 gateway error. 
var jwt         = require('jwt-simple');
var LocalStrategy = require('passport-local').Strategy;
// call all routes
var index = require('./routes/indexRouter');
var users = require('./routes/userRouter');
var statistic = require('./routes/statisticRouter');


mongoUtil.connectToServer( function( err ) {
    var db = mongoUtil.getDb();
    db.on('error', console.error.bind(console, 'connection error:'));
    // write to console after first connection to db server is established
    db.once('open', function(){
    // connected to database
    console.log("Connected correctly to server!");
  });
});

/*
//connect to database
mongoose.connect(config.database);
var db = mongoose.connection;
*/

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport configuration
var User = require('./models/userSchema'); // get the mongoose model
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/users', users);
app.use('/statistics', statistic)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(err);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
