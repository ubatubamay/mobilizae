const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('./auth/passport')(passport)
const userRouter = require('./routes/user.routes');

const app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/login',{ useNewUrlParser: true })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'palavraSecreta',
    saveUninitialized: false,
    resave: false
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist/mobilizae')));
app.use('/', express.static(path.join(__dirname, 'dist/mobilizae')));
app.use(passport.initialize())
app.use(passport.session())

// routes
app.use('/api/user', userRouter);
app.use('/auth', require('./routes/auth.routes')(passport));
app.use('/views', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
