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
    { plugin: 'hapi-auth-cookie' },
    {
      plugin: {
        register: 'good',
        options: {
          ops: {
            interval: 5000,
          },
          reporters: {
            console: [{
              module: 'good-squeeze',
              name: 'Squeeze',
              args: [{ log: '*', response: '*', error: '*' }],
            }, {
              module: 'good-console',
            }, 'stdout'],
          },
        },
      },
    },
  ],
}
