var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var FileStore = require('session-file-store') (session);
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mysql      = require('mysql');
var socketIo = require("socket.io");
var easyrtc = require("easyrtc");


var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var home = require('./routes/home');
var audio = require('./routes/audio');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');




// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(session({
  secret : '!@#$@$%!#@%!%#adsfadsf%(#^^$%^)',
  resave : false,
  saveUninitialized : true,
  store : new FileStore()
}));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zlekfl123',
  port     : '3306',
  database : 'login'
});

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));
app.use('/demos', express.static(path.join(__dirname, 'demos')));


app.use('/', index);
app.use('/users', users);
app.use('/home', home);
app.use('/audio', audio);



passport.serializeUser(function(user, done) {
  return done(null, user.username);
});

passport.deserializeUser(function(id, done) {
  var ob;
  sql = "SELECT id AS username, passwd AS password, lol_name AS nickname FROM user_data"


connection.query( sql , function (err, rows, columns){
  for(var i = 0; i<rows.length; i++){
    ob=rows[i];
    if( id == ob['username']){
        return done(null, ob);
      }
    }
  });
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/home',
                                   failureRedirect: '/',
                                   failureFlash: true
                                 }
                       )
);

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

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
