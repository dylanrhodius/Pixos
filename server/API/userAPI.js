'use strict';

var express = require('express');

module.exports = function(usersCollection) {

  var router = express.Router();

  router.get('/user', (req,res) => {
    // if a session exists:
    if (typeof(req.session.passport) !== 'undefined') {
      // find the user in the database whose facebookId (white) matches the session user's id (red)
      usersCollection.findOne({facebookId: req.session.passport.user}).then((userObj) => {
        res.setHeader('Content-Type', 'application/json');
        // return (or send) the document object
        res.send({user: userObj});
      })
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send({ user: null });
    }
  });

  return router;
}
