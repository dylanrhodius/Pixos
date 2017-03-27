'use strict';

var express = require('express');

module.exports = function(passport) {

  var router = express.Router();

  router.get('/auth/facebook',
    passport.authenticate('facebook'))

  router.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    })

  return router;
}
