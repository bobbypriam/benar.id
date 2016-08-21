require('dotenv').config()

const Path = require('path')
const Glue = require('glue')
const Handlebars = require('handlebars')

const routes = require('./routes')

const manifest = require('./manifest')

const dao = require('../data/dao')

const options = {
  relativeTo: Path.resolve(__dirname),
}

function initializeServer(server) {
  server.views({
    engines: { html: Handlebars },
    path: Path.resolve(__dirname, 'templates'),
    layoutPath: Path.resolve(__dirname, 'templates', 'layout'),
    layout: 'default',
    partialsPath: Path.resolve(__dirname, 'templates', 'partials'),
    isCached: false,
  })

  // Inject dao as models to server.app
  // This is so that requests can access models
  // through request.server.app.models
  server.app.models = dao // eslint-disable-line

  server.auth.strategy('session', 'cookie', {
    password: process.env.COOKIE_PASSWORD,
    isSecure: process.env.NODE_ENV === 'production',
  })

  server.route(routes)

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'client/dist',
      },
    },
  })

  return server
}

function run() {
  Glue.compose(manifest, options)
    .then(initializeServer)
    .then(server => server.start()
      .then(() => {
        console.log('Server running at:', server.info.uri)
      }))
    .catch(err => {
      console.error(err)
    })
}

module.exports.run = run
