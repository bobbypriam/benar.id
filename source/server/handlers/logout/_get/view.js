const handler = require('./handler')

module.exports = (request, reply) =>
  handler.handleRequest(request)
    .then(() => reply.redirect('/'))
