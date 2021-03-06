'use strict'

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const fuse = require('fuse.js')

const bodyParser = require('body-parser');
const hbs = require('hbs')
const bcrypt = require('bcrypt-as-promised')
const dotenv = require('dotenv').config()


const index = require('./routes/index');
const users = require('./routes/users');
const flag = require('./routes/flag')
const session = require('./routes/session')
const blogs = require('./routes/blogs')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, '/views/partials'))


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//enables https with Heroku
app.enable('trust proxy');

//Initalizes the session options object
const sessionOptions = {
  name: 'pinpoint',
  secret: process.env.SESSION_SECRET,
  secure: app.get('env') === 'production'
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession(sessionOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))

app.use('/', index);
app.use('/users', users);
app.use('/blogs', blogs)
app.use('/flag', flag)
app.use('/session', session)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
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
