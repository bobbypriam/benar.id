'use strict';

module.exports = {
  connections: [
    {
      port: process.env.PORT_UI,
      labels: ['ui'],
    },
  ],
  registrations: [
    { plugin: 'vision' },
    { plugin: 'inert' },
  ],
};
