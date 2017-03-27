'use strict'
//Import server modules
const express = require('express')
const bodyParser = require('body-parser')
const expressCookieParser = require('cookie-parser')
const debug = require('debug')('app:server')
const path = require('path')
const http = require('http')
const compress = require('compression')

//Import webpack and config
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')

// Import mongoDB
const monk = require('monk')
const mongoUrl = process.env.MONGO_URL
var db = monk(mongoUrl)

// Import sessions
const session = require('express-session')
const MongodbStoreFactory = require('connect-mongodb-session')
const MongoDBStore = MongodbStoreFactory(session)

// Setup database and server
const usersCollection = db.get('users')
const domain = process.env.APP_DOMAIN || 'localhost'
const app = express()
const server = http.createServer(app);
// Apply gzip compression
app.use(compress())
// Include JSON parser
app.use(bodyParser.json());

// Import game handling modules
global.connections = require("./Connections")();
global.matchmaking = require("./Matchmaker")();
global.Room = require("./Room");
global.User = require("./User");

//Import API routes
const deckAPI = require('./API/deckAPI.js')
const userAPI = require('./API/userAPI.js')(usersCollection)

// Set up sessions store
var store = new MongoDBStore(
  {
    uri: mongoUrl,
    collection: 'mySessions'
  })

store.on('error', function (error) {
  assert.ifError(error)
  assert.ok(false)
})

// Set up sessions
const SESSION_SECRET = 'Dr4c0R3x is the best'
const EXPRESS_SID_KEY = 'connect.sid';
const cookieParser = expressCookieParser(SESSION_SECRET)

app.use(session({
  secret: SESSION_SECRET,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 28 // 4 weeks
  },
  store: store,
  resave: false,
  saveUninitialized: false,
  name: EXPRESS_SID_KEY
}))

// Add database to requests
app.use(function (req, res, next) {
  req.db = db
  next()
})

// Import socket-io
require('./socketIo')(cookieParser, store, EXPRESS_SID_KEY, usersCollection, server)

// Import and use passport
const passport = require('./passportSetup')(usersCollection, domain)
const passportRoutes = require('./passportRoutes')(passport)
app.use(passport.initialize())
app.use(passport.session())

// Use routes
app.use(passportRoutes);
app.use(deckAPI);
app.use(userAPI);

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

module.exports = { app, server }
