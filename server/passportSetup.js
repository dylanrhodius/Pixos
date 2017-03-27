'use strict'
const passport = require('passport')
const databasetools = require('./databasetools')
var FacebookStrategy = require('passport-facebook').Strategy

module.exports = function(usersCollection, domain) {

  var FBStrategy = new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://"+domain+"/auth/facebook/callback",
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function (accessToken, refreshToken, profile, done) {
      var user = {
        identifier: profile.id,
        name: profile.displayName,
        image: profile.photos[0].value
      }
      return done(null, user)
  })

  passport.use(FBStrategy)

  passport.serializeUser(function (user, done) {
    done(null, user.identifier)
    // CALL SAVE/Store NEW USER
    databasetools.addTo(user, usersCollection)
  })

  passport.deserializeUser(function (user, done) {
    done(null, {
      user: user
    })

  })

  return passport;
}
