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
var FacebookStrategy = require('passport-facebook').Strategy

// Import mongoDB
const monk = require('monk')
const mongoUrl = process.env.MONGO_URL
var db = monk(mongoUrl)
// import session from express
const session = require('express-session')
const MongodbStoreFactory = require('connect-mongodb-session')
const MongoDBStore = MongodbStoreFactory(session)
// set a usersCollection constant equal to the users collection

const usersCollection = db.get('users')

const domain = process.env.APP_DOMAIN || 'localhost'
const app = express()

const server = http.createServer(app);

global.connections = require("./Connections")();

global.matchmaking = require("./Matchmaker")();

global.Room = require("./Room");

global.User = require("./User");

const deckAPI = require('./API/deckAPI.js')
const userAPI = require('./API/userAPI.js')(usersCollection)

// Apply gzip compression
app.use(compress())

app.use(bodyParser.json());

// Set up sessions
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

const io = require('./socketIo')(cookieParser, store, EXPRESS_SID_KEY, usersCollection, server)

app.use(deckAPI);
app.use(userAPI);

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

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = { app, server }
