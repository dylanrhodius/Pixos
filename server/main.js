'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const expressCookieParser = require('cookie-parser')
const debug = require('debug')('app:server')
const path = require('path')
const http = require('http')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const passport = require('passport')
const databasetools = require('./databasetools')
const sharedSession = require("express-socket.io-session");
var FacebookStrategy = require('passport-facebook').Strategy
var socketIo = require('socket.io')

// Import mongoDB
const mongo = require('mongodb')
const monk = require('monk')
const mongoUrl = process.env.MONGO_URL
var db = monk(mongoUrl)
const request = require('request')
// import session from express
const session = require('express-session')
const MongodbStoreFactory = require('connect-mongodb-session')
const MongoDBStore = MongodbStoreFactory(session)
// set a usersCollection constant equal to the users collection

const usersCollection = db.get('users')
const sessionsCollection = db.get('mySessions')


const domain = process.env.APP_DOMAIN || 'localhost'
const app = express()

const server = http.createServer(app);

global.connections = require("./Connections")();

global.matchmaking = require("./Matchmaker")();

global.Room = require("./Room");

global.User = require("./User");

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json());

// Set up sessions
var userStore = new MongoDBStore(
  {
    uri: mongoUrl,
    collection: 'users'
  })

var store = new MongoDBStore(
  {
    uri: mongoUrl,
    collection: 'mySessions'
  })

store.on('error', function (error) {
  assert.ifError(error)
  assert.ok(false)
})

const SESSION_SECRET = 'Dr4c0R3x is the best'

const EXPRESS_SID_KEY = 'connect.sid';
const cookieParser = expressCookieParser(SESSION_SECRET)

app.use(session({
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: false,
  saveUninitialized: false,
  name: EXPRESS_SID_KEY
}))

app.use(function (req, res, next) {
  req.db = db
  next()
})


// Loading socket.io
var io = socketIo({
    // Optional Socket.io options
});


io.use(function(socket, next) {
  console.log('in new session code')
    var request = socket.request;

    if(!request.headers.cookie) {
        console.log('no cookie transmitted')
        // If we want to refuse authentification, we pass an error to the first callback
        return next(new Error('No cookie transmitted.'));
    }

    // We use the Express cookieParser created before to parse the cookie
    // Express cookieParser(req, res, next) is used initialy to parse data in "req.headers.cookie".
    // Here our cookies are stored in "request.headers.cookie", so we just pass "request" to the first argument of function
    cookieParser(request, {}, function(parseErr) {
        console.log('in cookie parser')
        if(parseErr) { return next(new Error('Error parsing cookies.')); }

        // Get the SID cookie
        var sidCookie = (request.secureCookies && request.secureCookies[EXPRESS_SID_KEY]) ||
                        (request.signedCookies && request.signedCookies[EXPRESS_SID_KEY]) ||
                        (request.cookies && request.cookies[EXPRESS_SID_KEY]);
        console.log('sidCookie is', sidCookie)
        // Then we just need to load the session from the Express Session Store
        store.load(sidCookie, function(err, session) {
            console.log('in store loading, sessions is ', session)
            // And last, we check if the used has a valid session and if he is logged in
            if (err) {
                return next(err);

            // Session is empty
            } else if(!session) {
                return next(new Error('Session cannot be found/loaded'));

            // // Check for auth here, here is a basic example
            // } else if (session.isLogged !== true) {
            //     return next(new Error('User not logged in'));

            // Everything is fine
            } else {
                console.log('all is well')
                // If you want, you can attach the session to the handshake data, so you can use it again later
                // You can access it later with "socket.request.session" and "socket.request.sessionId"
                request.session = session;
                request.sessionId = sidCookie;

                return next();
            }
        });
    });
});

io.listen(server)

// When a client connects, we note it in the console
io.sockets.on('connection', function (socket) {
    console.log('new socket connection, session is ', socket.request.session)
    var userId = null;
    var deck = socket.request.session.deck
    if (socket.request.session.hasOwnProperty('passport')) {
      userId = socket.request.session.passport.user;
    }
    usersCollection.findOne({facebookId: userId}).then((userObj) => {
      console.log(userObj)
      console.log('A client is connected!');
      var user;
      connections.add(user = User(socket, userObj, deck));
      console.log("new user ", user.getName());

      socket.on("disconnect", function() {
        connections.remove(user);
        user.disconnect();
        console.log("user ", user.getName(), " disconnected");
        user = null;
      })
    })
 });

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
  // For this demo, we'll just return an object literal since our user
  // objects are this trivial.  In the real world, you'd probably fetch
  // your user object from your database here.
  done(null, {
    user: user
  })

})

app.use(passport.initialize())
app.use(passport.session())


// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.

  app.get('/auth/facebook',
    passport.authenticate('facebook'))

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    })

  app.get('/user', (req,res) => {
    // if a session exists:
    if(typeof(req.session.passport) !== 'undefined') {
      console.log('Session exists');
      // find the user in the database whose facebookId (white) matches the session user's id (red)
      usersCollection.findOne({facebookId: req.session.passport.user}).then((doc) => {
        res.setHeader('Content-Type', 'application/json');
        // return (or send) the document object
        res.send(doc);
      })
    } else {
      console.log('Session does not exist');
      res.setHeader('Content-Type', 'application/json');
      res.send('No data available');
    }
  });

  app.get('/user/deck', (req,res) => {
    // if a session deck exists:
    if (typeof(req.session.deck) !== 'undefined') {
      console.log('Session deck exists');
      res.setHeader('Content-Type', 'application/json');
      // return (or send) the document object
      res.send({ deck: req.session.deck });
    } else {
      console.log('Session does not exist');
      res.setHeader('Content-Type', 'application/json');
      res.send('No data available');
    }
  });

  app.post('/user/deck', function (req, res) {
    console.log("Request in /user", req.session);
    console.log("Request in /user", req.sessionId);
    req.session.deck = req.body
    res.send('')
  })

  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  app.get('/auth/facebook',
    passport.authenticate('facebook'))

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect('/')
    })

  app.get('/user', (req,res) => {
    // if a session exists:
    if(typeof(req.session.passport) !== 'undefined') {
      console.log('Session exists');
      // find the user in the database whose facebookId (white) matches the session user's id (red)
      usersCollection.findOne({facebookId: req.session.passport.user}).then((doc) => {
        res.setHeader('Content-Type', 'application/json');
        // return (or send) the document object
        res.send(doc);
      })
    } else {
      console.log('Session does not exist');
      res.setHeader('Content-Type', 'application/json');
      res.send('No data available');
    }
  });

  app.post('/user/deck', function (req, res) {
    console.log("Request in /user", req.session);
    console.log("Request in /user", req.sessionId);
    req.session.deck = req.body
    res.send('')
  })

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = { app, server }
