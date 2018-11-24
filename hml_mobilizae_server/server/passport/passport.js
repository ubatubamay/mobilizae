var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/users');
var session = require('express-session');
const jwt = require('jsonwebtoken');

module.exports = function (app, passport){

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
  }));

  passport.serializeUser(function(user, done) {
    token = jwt.sign({
        email: user.email,
        password: user.password
    }, 'secretKey');
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
    clientID: '272501246848588',
    clientSecret: 'b872eb47c9d0f51c379f7cb23071cd87',
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ['email']
  },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile._json.email);
      User.findOne({email: profile._json.email}).select('username password email').exec(function(err, user) {
        if(err) done(err);
        if(user & user != null){
          done(null, user);
        }else{
          done(err);
        }
      });
      done(null, profile);
    }
  ));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), 
    function(req, res){
      return res.status(200).json({
        message: "Auth successful",
        token: token
      });
    }
  );

  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  return passport;
}