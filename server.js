'use strict';

require('dotenv').config();

const Path = require('path');
const Glue = require('glue');
const Handlebars = require('handlebars');

const routes = require('./routes').map(route => ({
  method: 'GET',
  path: route.path,
  handler: (request, reply) => {
    reply.view(route.view, route.context || {});
  },
}));

const options = {
  relativeTo: Path.resolve(__dirname),
};

Glue.compose(require('./manifest'), options)
  .then(server => {
    server.views({
      engines: { html: Handlebars },
      path: Path.resolve(__dirname, 'templates'),
      layoutPath: Path.resolve(__dirname, 'templates', 'layout'),
      layout: 'default',
      partialsPath: Path.resolve(__dirname, 'templates', 'partials'),
      isCached: false,
    });

    server.route(routes);

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'static',
        },
      },
    });

    return server.start()
      .then(() => {
        console.log('Server running at:', server.info.uri);
      });
  })
  .catch(err => {
    throw err;
  });
