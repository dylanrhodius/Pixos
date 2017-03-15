'use strict'

const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')
const passport = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

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

const domain = process.env.APP_DOMAIN || 'localhost'
const app = express()

// Apply gzip compression
app.use(compress())

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
  done(null, user)
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

app.use(session({
  secret: 'This is a secret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
  store: store,
  resave: false,
  saveUninitialized: false
}))

app.use(function (req, res, next) {
  req.db = db
  next()
})

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
  if(typeof(req.session.passport) != 'undefined') {
    console.log('User is true');
    res.setHeader('Content-Type', 'application/json');
    res.send(req.session.passport.user);
  } else {
    console.log('User is false');
    res.setHeader('Content-Type', 'application/json');
    res.send('No data available');
  }
});

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

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = app
