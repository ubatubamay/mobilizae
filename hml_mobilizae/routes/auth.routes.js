var express = require('express');
var router = express.Router();

module.exports = function (passport) {
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/api/user',
    }), function (req, res) {
        res.send('hey')
    })
    return router;
};
