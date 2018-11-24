var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
var User = require('../models/user');

var loggedin = function (req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.send('Usuário não autenticado')
  }
}

/* GET home page. */
router.get('/', controller.index);


router.get('/login', function (req, res, next) {
  res.render('login');
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});


router.get('/profile', loggedin, function (req, res, next) {
  var newUser = User(req.user);
  if (newUser.isUser()) return res.send('Seja bem-vindo '+newUser.name);
  return res.redirect('/login');
});


router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/')
})
module.exports = router;
