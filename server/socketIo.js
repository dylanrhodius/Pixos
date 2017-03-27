'use strict'

var socketIo = require('socket.io');

module.exports = function(cookieParser, store, EXPRESS_SID_KEY, usersCollection, server) {

  // Load socket.io
  var io = socketIo({
      // Optional Socket.io options
  });

  io.use(function(socket, next) {
      var request = socket.request;

      if(!request.headers.cookie) {
          // If we want to refuse authentification, we pass an error to the first callback
          return next(new Error('No cookie transmitted.'));
      }

      cookieParser(request, {}, function(parseErr) {
          if(parseErr) { return next(new Error('Error parsing cookies.')); }

          // Get the SID cookie
          var sidCookie = (request.secureCookies && request.secureCookies[EXPRESS_SID_KEY]) ||
                          (request.signedCookies && request.signedCookies[EXPRESS_SID_KEY]) ||
                          (request.cookies && request.cookies[EXPRESS_SID_KEY]);
          // Then we just need to load the session from the Express Session Store
          store.load(sidCookie, function(err, session) {
              // And last, we check if the used has a valid session and if he is logged in
              if (err) {
                  return next(err);
              } else if(!session) {
                  return next(new Error('Session cannot be found/loaded'));
              } else {
                  request.session = session;
                  request.sessionId = sidCookie;
                  return next();
              }
          });
      });
  });

  io.listen(server)

  io.sockets.on('connection', function (socket) {
      var userId = null;
      var deck = socket.request.session.deck

      if (socket.request.session.hasOwnProperty('passport')) {
        userId = socket.request.session.passport.user;
      }

      usersCollection.findOne({facebookId: userId}).then((userObj) => {
        console.log('A client is connected!');
        var user;
        connections.add(user = User(socket, userObj, deck));
        console.log("new user ", user.getName());

        socket.on("disconnect", function() {
          console.log('Disconnected: ', user)
          connections.remove(user);
          user.disconnect();
          console.log("user ", user.getName(), " disconnected");
          user = null;
        })
      })
   });

   return io;
}
