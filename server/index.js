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

  server.app.models = dao

  server.route(routes)

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'static',
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
