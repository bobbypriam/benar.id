'use strict';

const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');

const server = new Hapi.Server();
server.connection({ port: 7654 });

const routes = [
  {
    path: '/',
    view: 'index',
  },
  {
    path: '/berita',
    view: 'list',
  },
].map(route => ({
  method: 'GET',
  path: route.path,
  handler: (request, reply) => {
    reply.view(route.view);
  },
}));

server.register([Vision, Inert], (err) => {
  if (err) {
    throw err;
  }

  server.views({
    engines: { html: Handlebars },
    path: `${__dirname}/views`,
    layout: true,
  });

  server.route(routes);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'dist',
      },
    },
  });
});

server.start(err => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
