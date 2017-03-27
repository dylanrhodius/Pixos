'use strict';

var express = require('express');
var router = express.Router();

router.get('/user/deck', (req,res) => {
  // if a session deck exists:
  if (typeof(req.session.deck) !== 'undefined') {
    res.setHeader('Content-Type', 'application/json');
    // return (or send) the document object
    res.send({ deck: req.session.deck });
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.send({ deck: null });
  }
});


router.post('/user/deck', function (req, res) {
  req.session.deck = req.body
  res.send('')
})

module.exports = router;
